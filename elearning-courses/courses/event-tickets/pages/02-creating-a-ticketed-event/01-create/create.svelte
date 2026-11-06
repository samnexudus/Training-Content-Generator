<script module>
  export const pageConfig = { title: 'Creating a Ticketed Event' };
</script>

<script>
  import { Accordion, AccordionItem, Callout } from 'tessera-learn';
</script>

<h1>Creating a Ticketed Event</h1>

<p>
  Previously, operators could list an event but had no way to charge for entry
  or limit attendance. Event Tickets adds ticket types, pricing, and capacity
  controls directly to the event form.
</p>

<h2>Ticket types</h2>

<p>
  Each event can have one or more ticket types — for example <strong>Standard</strong>,
  <strong>VIP</strong>, or <strong>Early-bird</strong>. Each type has its own price and
  capacity, so you can run limited-release tiers without juggling separate events.
</p>

<Accordion>
  <AccordionItem title="Pricing">
    <p>
      Prices are set per ticket type at creation. You can update a price any
      time before the event starts; members who already purchased keep the
      price they paid.
    </p>
  </AccordionItem>
  <AccordionItem title="Capacity rules">
    <p>
      Capacity is enforced per ticket type. When a type sells out it stops
      appearing in the member booking flow automatically.
    </p>
  </AccordionItem>
</Accordion>

<div class="asset-placeholder">
  <strong>Screenshot pending</strong>
  <span>
    [SCREENSHOT — show the Events page with a new event selected and the Sell
    tickets toggle visible]
  </span>
</div>

<Callout type="important">
  <p>
    Ticket sales are final once the event starts. Refunds must be processed
    manually by the operator.
  </p>
</Callout>

<h2>Create the event</h2>

<p>Follow these steps to create a ticketed event.</p>

<ol class="process">
  <li>Navigate to <strong>Events &gt; All events</strong>.</li>
  <li>Click <strong>Create event</strong> and complete the event details.</li>
  <li>Tick <strong>Sell tickets</strong>.</li>
  <li>Add at least one ticket type with a price and capacity.</li>
  <li>Click <strong>Save changes</strong>.</li>
</ol>

<p>Your event now appears in the member booking flow with live availability.</p>

<style>
  .asset-placeholder {
    display: grid;
    gap: 0.25rem;
    margin: var(--tessera-spacing-md) 0;
    padding: var(--tessera-spacing-md);
    border: 1px dashed var(--tessera-border);
    border-radius: 8px;
    background: var(--tessera-bg-secondary);
  }

  .asset-placeholder span {
    font-style: italic;
    color: var(--tessera-text-light);
    font-size: 0.875rem;
  }

  .process li {
    margin-bottom: 0.5rem;
  }
</style>
