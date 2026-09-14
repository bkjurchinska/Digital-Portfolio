// Copy + line items for the closing "Receipt" section. Kept out of the
// component the same way projectData / designData / galleryData are, so the
// wording can be tweaked without touching layout code.

export const RECEIPT = {
    // Printed at the top of the slip.
    shopName: 'Portfolio Receipt',

    // Totals block. `total` is what shows large; the rest are flavour.
    subtotal: '37.50',
    service: 'included',
    total: 'CV Link',

    // How to reach the chef. Add / remove rows freely -- `href` is optional,
    // rows without one (like the name) just render as plain text, not a link.
    contact: [
        { label: 'NAME',       value: 'Bisera Kjurchinska' },
        { label: 'PHONE (DE)', value: '+49 1604215195',  href: 'tel:+491604215195' },
        { label: 'PHONE (MK)', value: '+389 075360030',  href: 'tel:+389075360030' },
        { label: 'EMAIL',      value: 'bisera.kj@gmail.com', href: 'mailto:bisera.kj@gmail.com' },
        { label: 'GITHUB',     value: 'github.com/bisera',   href: 'https://github.com/bkjurchinska' },
        { label: 'LINKEDIN',   value: 'in/bisera',           href: 'https://www.linkedin.com/in/bkjurchinska/' },
    ],

    thanks: 'THANK YOU FOR YOUR VISIT!',
};
