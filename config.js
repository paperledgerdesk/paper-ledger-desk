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

// PLACEHOLDER PRICES per month, one line per currency. Change them freely.
// Use round numbers. Paystack (South Africa) always charges in ZAR, so the
// ZAR line must match your Paystack plans; the others are a guide for visitors.
const PRICES = {
  ZAR: { pro: 99,   business: 249 },
  USD: { pro: 7,    business: 17 },
  EUR: { pro: 7,    business: 16 },
  GBP: { pro: 6,    business: 14 },
  AUD: { pro: 11,   business: 26 },
  CAD: { pro: 10,   business: 23 },
  NGN: { pro: 9900, business: 24900 },
  KES: { pro: 900,  business: 2200 },
  INR: { pro: 499,  business: 1299 }
};

// Used when we can't tell where the visitor is.
const DEFAULT_CURRENCY = "USD";

// Email address for the waitlist buttons.
const WAITLIST_EMAIL = "paperledgerdesk@gmail.com";

/* ---- nothing below this line needs editing ---- */
(function () {
  // Guess the visitor's currency from their time zone, then their language
  // region. Everything happens in the browser; nothing is sent anywhere.
  function detectCurrency() {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    var exact = {
      "Africa/Lagos": "NGN", "Africa/Nairobi": "KES",
      "Asia/Kolkata": "INR", "Asia/Calcutta": "INR",
      "Europe/London": "GBP", "Europe/Belfast": "GBP", "Europe/Guernsey": "GBP",
      "Europe/Jersey": "GBP", "Europe/Isle_of_Man": "GBP"
    };
    var canada = /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Dawson|Dawson_Creek|Yellowknife|Iqaluit|Rankin_Inlet|Resolute|Cambridge_Bay|Inuvik|Swift_Current|Fort_Nelson|Creston|Atikokan|Nipigon|Thunder_Bay|Rainy_River|Pangnirtung)$/;
    if (exact[tz]) return exact[tz];
    if (/^Canada\//.test(tz) || canada.test(tz)) return "CAD";
    if (/^Africa\//.test(tz)) return "ZAR";
    if (/^Australia\//.test(tz)) return "AUD";
    if (/^Europe\//.test(tz)) return "EUR";
    if (/^(America|US)\//.test(tz)) return "USD";
    var byRegion = { ZA: "ZAR", US: "USD", GB: "GBP", AU: "AUD", CA: "CAD", NG: "NGN", KE: "KES", IN: "INR",
      DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", BE: "EUR", IE: "EUR", PT: "EUR", AT: "EUR", FI: "EUR", GR: "EUR" };
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      var m = /[-_]([A-Za-z]{2})\b/.exec(langs[i] || "");
      if (m && byRegion[m[1].toUpperCase()]) return byRegion[m[1].toUpperCase()];
    }
    return DEFAULT_CURRENCY;
  }

  function fmt(amount, cur) {
    try {
      return new Intl.NumberFormat(navigator.language || "en", {
        style: "currency", currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 0
      }).format(amount);
    } catch (e) { return cur + " " + amount; }
  }

  function showPrices(cur) {
    if (!PRICES[cur]) cur = PRICES[DEFAULT_CURRENCY] ? DEFAULT_CURRENCY : "ZAR";
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
    set("price-free", fmt(0, cur));
    set("price-pro", fmt(PRICES[cur].pro, cur));
    set("price-business", fmt(PRICES[cur].business, cur));
    var sel = document.getElementById("currency");
    if (sel) sel.value = cur;
    document.documentElement.setAttribute("data-currency", cur);
  }

  function setupButton(plan, label) {
    var btn = document.getElementById("btn-" + plan);
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

  var selEl = document.getElementById("currency");
  if (selEl) for (var k = selEl.options.length - 1; k >= 0; k--) {
    if (!PRICES[selEl.options[k].value]) selEl.remove(k);
  }

  var saved = null;
  try { saved = localStorage.getItem("pld-currency"); } catch (e) {}
  showPrices(saved && PRICES[saved] ? saved : detectCurrency());

  var sel = document.getElementById("currency");
  if (sel) sel.addEventListener("change", function () {
    showPrices(sel.value);
    try { localStorage.setItem("pld-currency", sel.value); } catch (e) {}
  });

  setupButton("pro", "Pro");
  setupButton("business", "Business");
})();
