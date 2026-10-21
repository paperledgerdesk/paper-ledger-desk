# Paper Ledger Desk

Invoicing and cash flow for South African freelancers and small businesses.
PDF invoices, email and WhatsApp reminders, and per-currency cash flow.
Everything runs in the browser and the data stays on the user's device.

- **Sales page:** `index.html` (the home page)
- **The app:** `app/index.html` (open it at `/app/`)
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

The prices on the page are **placeholders**. In `config.js` change:

```js
const PRICES = {
  pro: "R99",
  business: "R249"
};
```

Make sure they match the amounts on your Paystack plans.
If you want to remove the yellow "Placeholder price" labels once you are sure,
open `index.html` and delete the lines that contain `class="placeholder"`.

### 4. Set your waitlist email (TODO)

In `config.js`, replace `TODO-your-email@example.com` with your real address.
Also replace the same address in the two `mailto:` links in `index.html`
(they are used if a visitor's browser has JavaScript turned off).

## Important: what paying does and does not do today

The app keeps all data in the user's own browser. There are no accounts and no
server. That means **paying does not lock or unlock anything in the app yet**:
every feature is available in the free version. To have real paid-only features
(for example cloud backup, sync between devices, or several users), the app will
need user accounts and a small backend that checks Paystack subscriptions. That
is a later step.

## Hosting

The site is served free by GitHub Pages from this repository. The workflow in
`.github/workflows/pages.yml` republishes it every time `main` changes.
