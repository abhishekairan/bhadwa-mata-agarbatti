import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { useCart, type CartItem } from "@/lib/cart";
import { BRAND_NAME, WHATSAPP_URL } from "@/lib/brand";
import { pageHead, pageTitle } from "@/lib/seo";

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead({
      title: pageTitle("Checkout"),
      description: "Send your Bhadwamata Agarbatti order on WhatsApp.",
      path: "/checkout",
      noindex: true,
    }),
  component: CheckoutPage,
});

function buildOrderMessage(items: CartItem[], subtotal: number, form: FormData) {
  const field = (key: string) => String(form.get(key) ?? "").trim();
  const orderId = "BM" + Math.floor(100000 + Math.random() * 900000);
  const address = [
    field("addr1"),
    field("addr2"),
    [field("city"), field("state")].filter(Boolean).join(", "),
    field("pin"),
  ]
    .filter(Boolean)
    .join(", ");

  const lines = [
    `*New order — ${BRAND_NAME}*`,
    `Order ID: ${orderId}`,
    "",
    "*Items*",
    ...items.map(
      (it, i) =>
        `${i + 1}. ${it.product.name} (${it.pack}) × ${it.qty} — ${rupees.format(it.qty * it.product.price)}`,
    ),
    "",
    `*Total: ${rupees.format(subtotal)}*`,
    "",
    "*Customer*",
    `Name: ${field("name")}`,
    `Phone: ${field("phone")}`,
    `Email: ${field("email")}`,
    "",
    "*Delivery address*",
    address,
  ];
  if (field("notes")) lines.push("", `*Notes:* ${field("notes")}`);
  lines.push("", "Please confirm this order and share the payment details.");
  return lines.join("\n");
}

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    const message = buildOrderMessage(items, subtotal, new FormData(e.currentTarget));
    window.location.href = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  };
  return (
    <section className="container-x py-10 md:py-14">
      <Breadcrumb
        items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="mt-3 mb-8 break-words font-serif text-3xl sm:text-4xl">Checkout</h1>
      <form
        onSubmit={submit}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]"
      >
        <div className="space-y-8">
          <Section title="Contact Information">
            <Input name="name" label="Full Name" required />
            <Input name="email" type="email" label="Email" required />
            <Input name="phone" label="Mobile Number" required />
          </Section>
          <Section title="Shipping Address">
            <Input name="addr1" label="Address Line 1" required />
            <Input name="addr2" label="Address Line 2" />
            <div className="grid sm:grid-cols-3 gap-4">
              <Input name="city" label="City" required />
              <Input name="state" label="State" required />
              <Input name="pin" label="PIN Code" required />
            </div>
            <Input name="notes" label="Order Notes" />
          </Section>
        </div>
        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-5 sm:p-6">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            )}
            {items.map((it) => (
              <div key={it.product.id + it.pack} className="flex gap-3 text-sm">
                <img
                  src={it.product.image}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-lg object-cover object-[50%_72%]"
                />
                <div className="min-w-0 flex-1">
                  <div className="break-words font-medium leading-tight">{it.product.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {it.pack} × {it.qty}
                  </div>
                </div>
                <div className="shrink-0 font-medium">
                  {rupees.format(it.qty * it.product.price)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{rupees.format(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>Confirmed on WhatsApp</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{rupees.format(subtotal)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full btn-saffron rounded-full px-6 py-3.5 font-medium disabled:opacity-50"
          >
            Order on WhatsApp
          </button>
          <p className="text-center text-xs text-muted-foreground">
            You will be taken to WhatsApp with your order details ready to send. Payment is
            arranged with us there.
          </p>
        </aside>
      </form>
    </section>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5 sm:p-6">
      <h2 className="font-serif text-xl mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
