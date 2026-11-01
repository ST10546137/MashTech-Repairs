# MashTech Repairs — WEDE5020 Portfolio of Evidence

**Module:** Web Development (Introduction)  
**Module code:** WEDE5020  
**Project:** MashTech Repairs  
**Project type:** Five-page responsive HTML, CSS and JavaScript website  
**Service-area concept:** Pretoria, Gauteng, South Africa

> **Assessment honesty note:** This repository documents a static front-end student project. The forms prepare an email draft; they do not send or store submissions on a server. The browser test checklist at the end must only be marked complete after the student performs the tests. Responsive evidence must be captured from the final version of the site, not from an earlier design.

## 1. Project overview

MashTech Repairs is a multi-page website concept for a technology repair service. It provides business information, service categories, a repair enquiry form, contact information and a map-area reference. The project retains the five-page structure and relevant content from the earlier submission while improving the design, responsive behaviour, accessibility basics, front-end interactions and SEO metadata.

## 2. Website pages

| Page | Purpose and features |
|---|---|
| `index.html` | Homepage, service overview, responsive hero image and calls to action. |
| `about.html` | Business information, values and an interactive image gallery/lightbox. |
| `services.html` | Service cards, live text search, clear-search action, no-results message and links that preselect a device in the enquiry form. |
| `enquiry.html` | Repair enquiry form with required fields, browser validation, phone-number check, live problem-description count and email-draft preparation. |
| `contact.html` | Contact details, general contact form, validation and an OpenStreetMap area reference. |

The navigation menu links to all five pages. Each page has one main heading, a skip link, a current-page navigation marker, a page-specific title and meta description, and the shared stylesheet.

## 3. Technologies and structure

- HTML5 semantic structure and form controls.
- CSS3, Grid, Flexbox, responsive breakpoints and pseudo-classes.
- JavaScript for navigation, service filtering, gallery behaviour, query-string preselection and form validation.
- Visual Studio Code and Git/GitHub for development and version control.

```text
MashTech Repairs/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── css_assets/
│   └── site.css
├── js_assets/
│   └── subpages.js
├── _images/
│   └── page/             # Logo and responsive page images
├── evidence/             # Final desktop/tablet/mobile screenshots
└── README.md
```

## 4. Part 2 — CSS styling and responsive design

The supplied Formative 2 feedback recorded **71/85** overall. Visible criterion scores included feedback for Part 1 **4/10**, external stylesheet **10/10**, default styling **5/5**, typography **5/5**, layout structure **4/5**, and decoration/colour **5/5**. The feedback-for-Part-1 score indicated a need to document and demonstrate changes more clearly. The layout and responsive-design criteria also require attention to alignment, spacing and testing across screen sizes.

Changes carried forward in this iteration:

- Consolidated page styling in `css_assets/site.css`, linked from all five HTML pages.
- Applied shared typography, colour tokens, spacing, button, card and form styles.
- Used Grid and Flexbox for desktop layouts and switched to simpler layouts at tablet/mobile breakpoints.
- Added hover and visible keyboard-focus styles.
- Adjusted navigation, images, cards, forms and map layout for smaller screens.
- Added responsive image sources with `picture`, `srcset` and `sizes` on the homepage.
- Added a skip link, semantic landmarks, labels, alternative text, and reduced-motion support.
- Recorded the development changes in the changelog below.

## 5. Part 3 — Functionality and SEO

### Interactive elements

- The mobile navigation button toggles the menu and updates `aria-expanded`; selecting a navigation link closes the menu.
- The Services page filters service cards while the visitor types, reports the number of matching services and supports clearing the search.
- Service links pass a device value in the query string so the enquiry form can preselect the relevant device.
- The About page gallery opens a larger image in a lightbox. It can be closed with its button, the backdrop or Escape, and focus returns to the triggering control.

### Map

The Contact page contains an interactive OpenStreetMap view with two selectable service-area references: Pretoria Central and Hatfield. Selecting a button updates the embedded map and the external map link. These are general area references, not verified shop addresses or confirmed service counters.

### Enquiry and contact forms

Both forms have labelled controls and client-side validation. The repair form includes required customer/device fields, email validation, a phone pattern and minimum-digit check, required contact preference, problem-description length constraints and a live character count. After validation, it presents a clear response explaining that price and appointment availability require assessment; it provides a user-clicked link to open the prepared email draft. The contact form validates name, email, subject, message and consent and presents an explicit link to open the prepared general-contact email. Both forms declare an email action in their HTML and use JavaScript to build a more useful email draft.

**Important limitation:** This is a static front-end project. After successful validation, JavaScript prepares a `mailto:` draft addressed to `info@mashtechrepairs.co.za`. The visitor must review and send the email in their own email application. The website does not transmit or save enquiries, and successful form validation does not mean an email has been sent. Automatic processing would require a secure server-side endpoint or a form-processing service.

Before any real-world launch, verify the telephone number, email address, opening hours, service area and business claims. These are project content and are not independently confirmed by this code review.

### SEO foundations

Each page has a unique title, meta description and keywords tag, plus a robots directive, Open Graph title/description, viewport metadata, theme colour and `en-ZA` language declaration. Headings, navigation and image alternative text are provided. A canonical URL is intentionally omitted until the final public deployment URL is confirmed; do not invent a canonical address. Meta keywords are included because the assessment rubric requests them, although major search engines generally do not use them as a ranking signal. No search ranking or indexing result can be guaranteed by on-page metadata alone.

## 6. Performance and security considerations

- The homepage uses responsive image sources so smaller screens can download smaller variants; below-the-fold gallery images and the map iframe use lazy loading. Images declare intrinsic dimensions to reduce layout shifts and use asynchronous decoding where supported.
- JavaScript is loaded from the local `js_assets/subpages.js` file; no third-party JavaScript library is required. Form data is inserted into status messages using DOM text nodes/`textContent`, and email subject/body values are URL-encoded before creating `mailto:` links.
- External links that open new tabs use `rel="noopener noreferrer"`. The map embed is supplied by OpenStreetMap and needs an internet connection.
- This is a static website and does not store customer data or provide server-side processing. Do not place passwords, API keys, private tokens or real customer information in the repository. `mailto:` drafts depend on the visitor having an email application configured.
- GitHub Pages does not provide arbitrary HTTP security-header configuration for this project. Do not claim server-side security controls that are not implemented; this project demonstrates safer front-end handling and relies on the static-hosting platform for HTTPS.

## 7. Changelog

### 2026-11-01 — Part 3 implementation and Part 2 feedback follow-through

- Redesigned the five-page site using a consistent navy, blue and light-neutral visual system, shared spacing and reusable cards, forms and buttons.
- Applied the shared `css_assets/site.css` stylesheet to all five pages.
- Added unique page titles, meta descriptions, meta keywords, robots directives and Open Graph title/description metadata. **Canonical links were not added**, because the final deployment URL has not yet been confirmed.
- Added skip navigation, semantic page landmarks, current-page navigation states, descriptive image alternative text and visible focus styling.
- Added responsive navigation behaviour and responsive layout/image rules for desktop, tablet and mobile.
- Added live service filtering, result counts, a clear-search control and a no-results message.
- Added service-specific enquiry links that preselect a device type through a query parameter.
- Added an image lightbox with close-button, backdrop and Escape handling.
- Improved the repair enquiry form with required controls, email and phone validation, problem-description length constraints, a live character count and an accessible status message.
- Added a general contact form with required fields, validation and an explicit email-draft workflow.
- Added an OpenStreetMap area embed and a direct map link; the map does not represent a verified shop address.
- Documented the static-form limitation so the README does not claim that the website automatically sends or stores submissions.
- Updated this README to describe the current filenames and separate implemented features from tests that still require browser verification.

### Earlier work retained

- Part 1 established the five-page website structure and received a reported mark of **78%**.
- Part 2 established external CSS, typography, colour, layout and responsive styling. The feedback and subsequent changes are summarised above.

## 8. References

- Mozilla. (n.d.). *CSS: Cascading Style Sheets*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/CSS
- Mozilla. (n.d.). *Responsive images*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- Mozilla. (n.d.). *Client-side form validation*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
- World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
- OpenStreetMap contributors. (n.d.). *OpenStreetMap*. https://www.openstreetmap.org/ (map data attribution; map is embedded from OpenStreetMap).

**Image-source note:** Keep source/credit information with any externally sourced image used in the submitted project. If the original image source cannot be confirmed, do not invent a specific photographer or source URL; replace it with a correctly credited image or document its verified source before final submission.

## 9. Test checklist — complete on the target PC/browser

The automated checks performed during this audit are recorded separately from interactive browser checks. Do not mark the pending items as passed until they have actually been tested.

| Check | Expected result | Status at packaging |
|---|---|---|
| Parse the five HTML files and check local relative paths | HTML files parse; linked local stylesheets, scripts, pages and images exist | Automated check passed |
| JavaScript syntax | `subpages.js` and `homepage.js` pass `node --check` | Automated check passed |
| One page-specific title, description, H1 and stylesheet per page | All five pages contain these elements | Automated check passed |
| Duplicate IDs and image alt attributes | No duplicate IDs; all images have `alt` attributes | Automated check passed |
| Navigate across all five pages in a browser | Each navigation link opens the correct page | **Pending browser test** |
| Responsive layout at 1440px, 768px and 390px | No unintended horizontal overflow; content and navigation fit | **Pending browser test** |
| Services search for “laptop”, no-match term and clear action | Correct cards filter; no-results message and reset work | **Pending browser test** |
| Gallery open/close by button, backdrop and Escape | Image/caption display and viewer closes correctly | **Pending browser test** |
| Empty form, invalid email, short phone and valid repair enquiry | Invalid input is blocked; valid data shows cost/availability guidance and an email-draft link | **Pending browser test** |
| Contact form invalid and valid submissions | Validation works; valid data reveals a link to prepare a draft (does not send automatically) | **Pending browser test** |
| OpenStreetMap map selection (Pretoria Central/Hatfield) and external map link | Selecting each area updates the map, title, description and external link | **Pending browser test** |
| Deployment | Public site loads without missing assets or console errors | **Pending deployment** |
| Responsive screenshots | Capture real final-version desktop/tablet/mobile screenshots and save in `evidence/` | **Pending capture** |

### Required screenshot evidence

Capture the final site in the browser's responsive/device toolbar and save the screenshots in this folder with these exact names:

- `evidence/evidence-laptop.png` — desktop, around 1440 × 900.
- `evidence/evidence-tablet.png` — tablet, 768 × 1024.
- `evidence/evidence-mobile.png` — mobile, 390 × 844.

The screenshots must be captured from the final code. Do not submit old screenshots or resized copies of one screenshot as evidence of different viewports. Insert the images into this README after capture if the assessment instructions require screenshots to be visible inside the document.

## 10. Final submission checks

1. Complete all pending browser tests above.
2. Capture genuine desktop, tablet and mobile screenshots and place them in `evidence/`.
3. Verify the public deployment URL and test every page and asset on the deployed version.
4. Add a canonical URL only if appropriate and only after confirming the final public URL.
5. Check the Git history contains multiple descriptive commits, including feedback changes and Part 3 functionality.
6. Ensure the README reflects the actual final code and that no credentials, private keys or unnecessary personal data are committed.
7. Submit the GitHub repository/deployment links as required by the LMS instructions.
