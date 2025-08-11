import React from "react";

export default class DenmarkMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverName: null,
      tooltip: { x: 0, y: 0 },
      svgLoaded: false,
      error: null,
    };
    this.wrapperRef = React.createRef();
    this.selectedEl = null;
    this.svgBackgroundClickBound = (e) => this.svgBackgroundClick(e);
  }

  componentDidMount() {
    if (this.props.svgText) {
      this.mountFromText(this.props.svgText);
    } else if (this.props.svgUrl) {
      this.loadSvg(this.props.svgUrl);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.svgUrl !== this.props.svgUrl && this.props.svgUrl) {
      this.loadSvg(this.props.svgUrl);
    }
    if (prevProps.svgText !== this.props.svgText && this.props.svgText) {
      this.mountFromText(this.props.svgText);
    }
  }

  componentWillUnmount() {
    this.teardownListeners();
  }

  async loadSvg(url) {
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Kunne ikke hente SVG: ${res.status}`);
      const svgText = await res.text();
      this.mountFromText(svgText);
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, svgLoaded: false });
    }
  }

  mountFromText(svgText) {
    if (this.wrapperRef.current) {
      this.wrapperRef.current.innerHTML = svgText;
    }
    this.wireUpPaths();
    this.setState({ svgLoaded: true, error: null });
  }

  teardownListeners() {
    const root = this.wrapperRef.current;
    if (!root) return;
    const selector = this.props.pathSelector || "path, polygon";
    root.querySelectorAll(selector).forEach((el) => {
      el.removeEventListener("mouseenter", this.dom_onEnter);
      el.removeEventListener("mouseleave", this.dom_onLeave);
      el.removeEventListener("click", this.dom_onClick);
      el.removeEventListener("keydown", this.dom_onKeyDown);
    });
    const svg = root.querySelector("svg");
    if (svg) {
      svg.removeEventListener("click", this.svgBackgroundClickBound, true);
    }
  }

  wireUpPaths() {
    const root = this.wrapperRef.current;
    if (!root) return;
    this.teardownListeners();

    const svg = root.querySelector("svg");
    if (svg) {
      svg.style.width = "100%";
      svg.style.height = "auto";
      svg.addEventListener("click", this.svgBackgroundClickBound, true);
    }

    const selector = this.props.pathSelector || "path, polygon";
    root.querySelectorAll(selector).forEach((el) => {
      el.style.cursor = "pointer";
      el.style.outline = "none";
      el.addEventListener("mouseenter", this.dom_onEnter);
      el.addEventListener("mouseleave", this.dom_onLeave);
      el.addEventListener("click", this.dom_onClick);
      el.addEventListener("keydown", this.dom_onKeyDown);
    });
  }

  dom_onEnter = (e) => {
    const name = this.getElementName(e.currentTarget);
    this.setState({ hoverName: name });
  };

  dom_onLeave = () => this.setState({ hoverName: null });

  dom_onClick = (e) => {
    e.stopPropagation();
    const el = e.currentTarget;
    const id = el.getAttribute("id") || "";
    const name = this.getElementName(el);
    this.selectElement(el);
    this.props.onSelectMunicipality?.(id, name);
  };

  dom_onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.dom_onClick(e);
    }
  };

  getElementName(el) {
    const dataName = el.getAttribute("data-name");
    if (dataName) return dataName;
    const { nameMap, getName } = this.props;
    const id = el.getAttribute("id") || "";
    if (nameMap && id && nameMap[id]) return nameMap[id];
    if (typeof getName === "function") {
      try {
        return getName(el) || id;
      } catch {}
    }
    return id;
  }

  selectElement(el) {
    if (this.selectedEl === el) return;
    this.clearSelection();

    const cs = window.getComputedStyle(el);
    el.dataset._origStyleFill = el.style.fill || "";
    el.dataset._origStyleStroke = el.style.stroke || "";
    el.dataset._origStyleStrokeWidth = el.style.strokeWidth || "";

    const pathIsClosed = /[Zz]/.test(el.getAttribute("d") || "");
    const hasUsableFill = cs.fill !== "none" && pathIsClosed;

    const activeFill = this.props.activeFill || "#16a34a";
    const activeStroke = this.props.activeStroke || activeFill;

    if (hasUsableFill) {
      el.style.fill = activeFill;
    } else {
      el.style.stroke = activeStroke;
      const baseWidth = parseFloat(cs.strokeWidth || "1") || 1;
      el.style.strokeWidth = String(baseWidth * 2);
    }

    this.selectedEl = el;
  }

  clearSelection() {
    if (!this.selectedEl) return;
    const prev = this.selectedEl;
    const origFill = prev.dataset._origStyleFill;
    const origStroke = prev.dataset._origStyleStroke;
    const origStrokeWidth = prev.dataset._origStyleStrokeWidth;

    if (origFill && origFill.length > 0) {
      prev.style.fill = origFill;
    } else {
      prev.style.removeProperty("fill");
    }
    if (origStroke && origStroke.length > 0) {
      prev.style.stroke = origStroke;
    } else {
      prev.style.removeProperty("stroke");
    }
    if (origStrokeWidth && origStrokeWidth.length > 0) {
      prev.style.strokeWidth = origStrokeWidth;
    } else {
      prev.style.removeProperty("stroke-width");
    }

    this.selectedEl = null;
  }

  svgBackgroundClick(e) {
    const selector = this.props.pathSelector || "path, polygon";
    if (!(e.target && e.target.matches && e.target.matches(selector))) {
      this.clearSelection();
    }
  }

  renderTooltip() {
    const { hoverName, tooltip } = this.state;
    if (!hoverName) return null;
    return (
      <div
        className="absolute pointer-events-none select-none rounded-md bg-black/80 px-2 py-1 text-xs text-white shadow-md"
        style={{ left: tooltip.x + 10, top: tooltip.y + 10, position: "absolute" }}
      >
        {hoverName}
      </div>
    );
  }

  render() {
    const { className = "" } = this.props;
    const { error } = this.state;
    return (
      <div
        className={`relative ${className}`}
        onMouseMove={(e) => {
          const bounds = this.wrapperRef.current?.getBoundingClientRect();
          const x = e.clientX - (bounds?.left || 0);
          const y = e.clientY - (bounds?.top || 0);
          this.setState({ tooltip: { x, y } });
        }}
      >
        <div ref={this.wrapperRef} />
        {error && (
          <div className="absolute top-2 left-2 rounded bg-red-600 text-white text-xs px-2 py-1 shadow">
            {error}
          </div>
        )}
        {this.renderTooltip()}
      </div>
    );
  }
}
