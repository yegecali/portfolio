"""
PDF CV generator using fpdf2.

Generates a professional, single-column resume from portfolio database data.
Supports ES and EN languages.
"""

from __future__ import annotations

import io
from typing import Any

from fpdf import FPDF

# ── Colour palette ─────────────────────────────────────────────────────────────

C_PRIMARY   = (37,  99,  235)   # blue-600
C_PRIMARY_L = (219, 234, 254)   # blue-100  (light text on dark bg)
C_DARK      = (15,  23,  42)    # slate-900
C_BODY      = (51,  65,  85)    # slate-700
C_MUTED     = (100, 116, 139)   # slate-500
C_LINE      = (226, 232, 240)   # slate-200
C_WHITE     = (255, 255, 255)
C_CHIP_BG   = (241, 245, 249)   # slate-100
C_CHIP_TEXT = (71,  85,  105)   # slate-600

# ── i18n strings ───────────────────────────────────────────────────────────────

_LABELS = {
    "es": {
        "about":       "Sobre mí",
        "experience":  "Experiencia Laboral",
        "projects":    "Proyectos Destacados",
        "skills":      "Habilidades Técnicas",
        "languages":   "Idiomas",
        "present":     "Presente",
        "technologies":"Tecnologías",
    },
    "en": {
        "about":       "About me",
        "experience":  "Work Experience",
        "projects":    "Featured Projects",
        "skills":      "Technical Skills",
        "languages":   "Languages",
        "present":     "Present",
        "technologies":"Technologies",
    },
}

MONTH_NAMES = {
    "es": ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
           "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "en": ["", "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December"],
}


def _fmt_date(ym: str | None, lang: str, present_label: str) -> str:
    """'2022-05'  →  'Mayo 2022'  or  'May 2022'."""
    if not ym:
        return present_label
    try:
        year, month = ym.split("-")
        return f"{MONTH_NAMES[lang][int(month)]} {year}"
    except (ValueError, IndexError):
        return ym


# ── PDF class ──────────────────────────────────────────────────────────────────

class PortfolioPDF(FPDF):
    """Custom FPDF subclass for the portfolio CV."""

    PAGE_W  = 210   # A4 width in mm
    MARGIN  = 18
    CONTENT = 210 - 18 * 2   # 174 mm
    HEADER_H = 42

    def __init__(self, lang: str = "es"):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.lang = lang
        self.labels = _LABELS.get(lang, _LABELS["en"])
        self.set_margins(self.MARGIN, self.MARGIN, self.MARGIN)
        self.set_auto_page_break(auto=True, margin=18)

    # ── Low-level helpers ─────────────────────────────────────────────────────

    def _rgb(self, c: tuple[int, int, int]) -> None:
        self.set_text_color(*c)

    def _fill(self, c: tuple[int, int, int]) -> None:
        self.set_fill_color(*c)

    def _draw(self, c: tuple[int, int, int]) -> None:
        self.set_draw_color(*c)

    def _h_line(self) -> None:
        """Draw a full-width hairline separator."""
        self._draw(C_LINE)
        self.set_line_width(0.3)
        self.line(self.MARGIN, self.get_y(), self.PAGE_W - self.MARGIN, self.get_y())
        self.ln(3)

    def _section_title(self, title: str) -> None:
        self.ln(5)
        # Accent bar
        x, y = self.MARGIN, self.get_y()
        self._fill(C_PRIMARY)
        self.rect(x, y + 0.5, 3, 5, "F")
        # Title text
        self.set_x(x + 5)
        self.set_font("Helvetica", "B", 11)
        self._rgb(C_PRIMARY)
        self.cell(0, 6, title.upper(), ln=False)
        self.ln(6)
        self._h_line()
        self._rgb(C_DARK)

    def _chip(self, text: str) -> None:
        """Render a small inline chip (technology badge)."""
        self.set_font("Helvetica", "", 7.5)
        self._rgb(C_CHIP_TEXT)
        w = self.get_string_width(text) + 4
        h = 4.5
        # If chip would overflow the line, wrap
        if self.get_x() + w > self.PAGE_W - self.MARGIN:
            self.ln(h + 1)
            self.set_x(self.MARGIN + 4)
        x, y = self.get_x(), self.get_y()
        self._fill(C_CHIP_BG)
        self._draw(C_LINE)
        self.set_line_width(0.2)
        self.rect(x, y, w, h, "FD")
        self.set_xy(x + 2, y)
        self.cell(w - 4, h, text, ln=False)
        self.set_x(self.get_x() + 1)

    # ── Section renderers ─────────────────────────────────────────────────────

    def render_header(self, personal: Any, hero: Any) -> None:
        """Full-width blue header band."""
        self._fill(C_PRIMARY)
        self.rect(0, 0, self.PAGE_W, self.HEADER_H, "F")

        # Name
        self.set_xy(self.MARGIN, 8)
        self.set_font("Helvetica", "B", 22)
        self._rgb(C_WHITE)
        self.cell(0, 9, personal.name, ln=True)

        # Role
        self.set_x(self.MARGIN)
        self.set_font("Helvetica", "", 11)
        self._rgb(C_PRIMARY_L)
        role = getattr(hero, "badge", personal.role).replace("⚡ ", "")
        self.cell(0, 6, role, ln=True)

        # Contact row
        self.set_x(self.MARGIN)
        self.set_font("Helvetica", "", 8.5)
        self._rgb(C_PRIMARY_L)
        parts = []
        if personal.location:
            parts.append(f"📍 {personal.location}")
        if personal.email:
            parts.append(f"✉ {personal.email}")
        if personal.phone:
            parts.append(f"☎ {personal.phone}")
        self.cell(0, 5, "   |   ".join(parts), ln=True)

        # Links row
        self.set_x(self.MARGIN)
        self.set_font("Helvetica", "", 8)
        link_parts = []
        if personal.github_url:
            link_parts.append(personal.github_url.replace("https://", ""))
        if personal.linkedin_url:
            link_parts.append(personal.linkedin_url.replace("https://", ""))
        if link_parts:
            self.cell(0, 4.5, "   |   ".join(link_parts), ln=True)

        self.set_y(self.HEADER_H + 3)

    def render_about(self, about: Any) -> None:
        self._section_title(self.labels["about"])
        self.set_font("Helvetica", "", 9.5)
        self._rgb(C_BODY)
        for para in about.paragraphs:
            self.multi_cell(self.CONTENT, 5, para)
            self.ln(1.5)

    def render_experience(self, experiences: list[Any]) -> None:
        self._section_title(self.labels["experience"])
        present = self.labels["present"]

        for exp in experiences:
            # Position + company (left)  |  dates (right)
            self.set_font("Helvetica", "B", 10)
            self._rgb(C_DARK)
            title_text = f"{exp.position}  —  {exp.company}"
            self.cell(self.CONTENT - 40, 5.5, title_text, ln=False)

            # Date range (right-aligned)
            start = _fmt_date(exp.start_date, self.lang, present)
            end   = _fmt_date(exp.end_date,   self.lang, present)
            self.set_font("Helvetica", "I", 8.5)
            self._rgb(C_MUTED)
            self.cell(40, 5.5, f"{start} — {end}", ln=True, align="R")

            # Bullet points
            self.set_font("Helvetica", "", 9)
            self._rgb(C_BODY)
            for bullet in exp.summary:
                self.set_x(self.MARGIN + 3)
                self._rgb(C_PRIMARY)
                self.cell(4, 4.8, "▸", ln=False)
                self._rgb(C_BODY)
                self.multi_cell(self.CONTENT - 7, 4.8, bullet)

            self.ln(3)

    def render_projects(self, projects: list[Any]) -> None:
        self._section_title(self.labels["projects"])

        for proj in projects:
            # Project name
            self.set_font("Helvetica", "B", 10)
            self._rgb(C_DARK)
            self.cell(0, 5.5, proj.name, ln=True)

            # Description
            self.set_font("Helvetica", "", 9)
            self._rgb(C_BODY)
            self.multi_cell(self.CONTENT, 4.8, proj.description)
            self.ln(1)

            # Technology chips
            self.set_x(self.MARGIN)
            self.set_font("Helvetica", "I", 8)
            self._rgb(C_MUTED)
            self.cell(18, 4.5, f"{self.labels['technologies']}: ", ln=False)
            for tech in (proj.technologies or []):
                self._chip(tech)
            self.ln(7)

    def render_skills(self, technologies: list[Any]) -> None:
        self._section_title(self.labels["skills"])

        # Group by category
        categories: dict[str, list[str]] = {}
        for tech in technologies:
            cat = tech.category or "Other"
            categories.setdefault(cat, []).append(tech.label)

        for cat, techs in categories.items():
            self.set_font("Helvetica", "B", 9)
            self._rgb(C_DARK)
            self.cell(28, 5, cat, ln=False)

            self.set_font("Helvetica", "", 9)
            self._rgb(C_BODY)
            self.multi_cell(self.CONTENT - 28, 5, ", ".join(techs))

        self.ln(2)

    def render_spoken_languages(self, spoken_languages: list[Any]) -> None:
        self._section_title(self.labels["languages"])

        for lang_item in spoken_languages:
            # Name + level
            self.set_font("Helvetica", "", 9.5)
            self._rgb(C_BODY)
            label = f"{lang_item.flag}  {lang_item.name}  —  {lang_item.level}"
            self.cell(80, 5.5, label, ln=False)

            # Progress bar
            bar_x = self.get_x()
            bar_y = self.get_y() + 1.5
            bar_w = 55
            bar_h = 2.5
            pct = (lang_item.proficiency or 0) / 100

            self._fill(C_LINE)
            self._draw(C_LINE)
            self.set_line_width(0.1)
            self.rect(bar_x, bar_y, bar_w, bar_h, "FD")

            self._fill(C_PRIMARY)
            self.rect(bar_x, bar_y, bar_w * pct, bar_h, "F")

            # Percentage label
            self.set_x(bar_x + bar_w + 2)
            self.set_font("Helvetica", "", 7.5)
            self._rgb(C_MUTED)
            self.cell(12, bar_h + 1, f"{lang_item.proficiency}%", ln=True)

        self.ln(2)


# ── Public entry point ─────────────────────────────────────────────────────────

def generate_cv(portfolio_data: Any, lang: str = "es") -> bytes:
    """
    Build the full CV PDF and return it as bytes.

    `portfolio_data` is expected to have the same shape as `FullPortfolioOut`:
        .personal, .hero, .about, .experiences,
        .projects, .technologies, .spoken_languages
    """
    pdf = PortfolioPDF(lang=lang)
    pdf.add_page()

    pdf.render_header(portfolio_data.personal, portfolio_data.hero)
    pdf.render_about(portfolio_data.about)
    pdf.render_experience(portfolio_data.experiences)
    pdf.render_projects(portfolio_data.projects)
    pdf.render_skills(portfolio_data.technologies)
    pdf.render_spoken_languages(portfolio_data.spoken_languages)

    buf = io.BytesIO()
    pdf.output(buf)
    return buf.getvalue()
