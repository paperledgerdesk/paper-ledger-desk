# Paper Ledger Desk

Invoicing and cash flow for freelancers and small businesses, anywhere in the world.
PDF invoices, email and WhatsApp reminders, and per-currency cash flow
(ZAR, USD, EUR, GBP, AUD and CAD).
Everything runs in the browser and the data stays on the user's device.

- **Sales page:** `index.html` (the home page)
- **The app:** `app/index.html` (open it at https://paperledgerdesk.github.io/paper-ledger-desk/app/)
- **Settings for prices and payment links:** `config.js`
- **Screenshots:** `assets/`

## How to change prices, payment links and the waitlist email

You only edit one file: **`config.js`**. On GitHub, open the file, click the
pencil icon (Edit), make the change, then click **Commit changes**.
The live site updates by itself in about 1 to 2 minutes.

### 1. Make your Paystack subscription links

1. Log in to the **Paystack dashboard**.
2. Open **Payment Pages** and click **Create Payment Page**.
3. Choose **Subscription**.
4. Pick or create a plan (for example "Pro, R99, monthly"). Give the page a name and save.
5. Copy the page link. It looks like `https://paystack.com/pay/your-page-name`.
6. Do the same again for the Business plan.

### 2. Paste the links into `config.js`

Find this part near the top:

```js
const PAYSTACK_LINK = {
  pro: "",
  business: ""
};
```

Paste each link between the quotes, like this:

```js
const PAYSTACK_LINK = {
  pro: "https://paystack.com/pay/your-pro-page",
  business: "https://paystack.com/pay/your-business-page"
};
```

When a link is filled in, that button changes to **Subscribe to Pro** (or Business)
and goes to your Paystack page. While a link is empty, the button says
**Coming soon, join waitlist** and opens an email to you instead.
Links must start with `https://`.

### 3. Change the prices

The prices on the page are **placeholders**. The page shows them in the
visitor's own currency. It guesses the currency from the visitor's time zone and
browser language, inside their browser, with nothing sent anywhere. Visitors can
also pick a currency from the "Show prices in" list.

In `config.js` there is one line per currency:

```js
const PRICES = {
  ZAR: { pro: 99,   business: 249 },
  USD: { pro: 7,    business: 17 },
  ...
};
```

- Change the numbers to whatever you like (whole numbers, no currency symbols).
- To stop offering a currency, delete its line. It also disappears from the list.
- **The ZAR line must match your Paystack plans.** A South African Paystack
  account charges in rand only. Other currencies are a guide: the customer's bank
  converts the rand amount, so what they pay can differ slightly from the
  number shown. The page says this under the prices.
- `DEFAULT_CURRENCY` is used when the page can't tell where a visitor is.

If you want to remove the yellow "Placeholder price" labels once you are sure,
open `index.html` and delete the lines that contain `class="placeholder"`.

### 4. Waitlist email

The waitlist buttons send email to **paperledgerdesk@gmail.com**. To change it,
edit `WAITLIST_EMAIL` in `config.js` and the same address in the two `mailto:`
links in `index.html` (they are used if a visitor's browser has JavaScript turned off).

## Feedback (one-tap "Send" in the app)

In the app, **More › Settings › Feedback & suggestions › Send** posts the message privately to the team's own
secure feedback inbox (the `feedback` Supabase Edge Function, `backend/supabase/functions/feedback`). Only what the
user types is sent: the message (a typed name is added at the top), a category (Complaint, Suggestion, Bug report,
Praise or Other), an optional reply email, the app version and, only if the user ticks the box, the page path
(the server then also keeps the browser's user-agent). Invoices, clients, amounts and settings are never sent.
If sending fails or the device is offline, the note is kept on the device and retried automatically; emailing it
by hand is offered as a last resort.

Quick ratings (1–5 stars after the 3rd invoice is sent) and thumbs up/down (after the first PDF and the first
recorded payment) open this same dialog. Until the server has dedicated fields, they are folded into the first line
of `message`, e.g. `Rating: 4/5 | Context: invoice-sent | Usage: pdf=3, send=2, …` (Usage only if the user ticks
"Include my feature usage counts"), with the user's own text on the following lines. Category is Praise for a 4–5
rating or a thumbs up and Other otherwise. The folding lives in one function, `fbFold()`, in `app/index.html`.

- The endpoint is `FEEDBACK_ENDPOINT` in `config.js`. The app is a single offline file and cannot read
  `config.js`, so `app/index.html` has the same value in its own `FEEDBACK_ENDPOINT` constant, and its
  Content-Security-Policy allows `connect-src https://zovatyzvqmszrgoacpum.supabase.co` only. Change all three together.
- The function only accepts the origin `https://paperledgerdesk.github.io`. A copy of the app opened as a local
  file (or from any other site) gets 403: the note stays saved on the device, the copy/email option is shown, and
  it is not retried in the background (it is tried once on each app open, so it goes through when opened from the site).

## Important: what paying does and does not do today

The app keeps all data in the user's own browser. There are no accounts and no
server (the only thing that ever leaves the device is feedback the user chooses to send). That means **paying does not lock or unlock anything in the app yet**:
every feature is available in the free version. To have real paid-only features
(for example cloud backup, sync between devices, or several users), the app will
need user accounts and a small backend that checks Paystack subscriptions. That
is a later step.

## Hosting

The site is served free by GitHub Pages at https://paperledgerdesk.github.io/paper-ledger-desk/ from this repository. The workflow in
`.github/workflows/pages.yml` republishes it every time `main` changes.
