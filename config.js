/* ================================================================
   PAPER LEDGER DESK - SALES PAGE SETTINGS
   This is the only file you need to edit to change payment links,
   prices and the waitlist email. See README.md for step-by-step help.
   ================================================================ */

// Paste your Paystack subscription payment-page links between the quotes.
// Example: pro: "https://paystack.com/pay/paper-ledger-pro"
// While a link is empty (""), that button shows "Coming soon, join waitlist".
const PAYSTACK_LINK = {
  pro: "",
  business: ""
};

// PLACEHOLDER PRICES - change these to whatever you decide to charge.
const PRICES = {
  pro: "R99",
  business: "R249"
};

// TODO: replace with your real email address for the waitlist.
const WAITLIST_EMAIL = "TODO-your-email@example.com";

/* ---- nothing below this line needs editing ---- */
(function () {
  function setup(plan, label) {
    var btn = document.getElementById("btn-" + plan);
    var price = document.getElementById("price-" + plan);
    if (price && PRICES[plan]) price.textContent = PRICES[plan];
    if (!btn) return;
    var link = (PAYSTACK_LINK[plan] || "").trim();
    if (/^https:\/\//i.test(link)) {
      btn.href = link;
      btn.textContent = "Subscribe to " + label;
      btn.rel = "noopener";
    } else {
      btn.href = "mailto:" + WAITLIST_EMAIL +
        "?subject=" + encodeURIComponent("Paper Ledger Desk " + label + " waitlist");
      btn.textContent = "Coming soon, join waitlist";
    }
  }
  setup("pro", "Pro");
  setup("business", "Business");
})();
