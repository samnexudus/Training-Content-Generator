<script module>
  export const pageConfig = { title: 'Drawing in the editor' };
</script>

<script>
  import { Accordion, AccordionItem } from 'tessera-learn';
</script>

<h1>Drawing in the editor</h1>

<p>The editor is where a floor plan is drawn: walls, partitions, doors, windows, furnishings, and the areas that become your units. It opens from a floor plan's <strong>Open Floor Plan Editor</strong> action, or from a unit's <strong>View on floor plan</strong>.</p>
<p>The header carries the plan's name and location, the toolbar, and <strong>Save</strong> — which stays unavailable until something has changed. Nothing you do is stored until you save.</p>
<h2>Two modes</h2>
<p>The mode buttons sit at the top of the editor:</p>
<Accordion>
  <AccordionItem title='View availability'>
<p>For reading the plan: what is free, what is taken, and by whom, on a date you choose. Occupancy is worked out from the contracts and proposals on each unit — so you can answer “what is free in March” by changing the date rather than reading contracts. The sidebar lists the units with an occupancy swatch each: <strong>green</strong> is available, <strong>red</strong> is occupied, <strong>blue</strong> is reserved later, <strong>yellow</strong> is proposed.</p>
  </AccordionItem>
  <AccordionItem title='Edit layout'>
<p>For changing the drawing. It adds the drawing tools and the grid, and puts the floor area on every room. A plan opened from a unit arrives in View availability with that unit selected.</p>
  </AccordionItem>
</Accordion>
<div class="asset-placeholder">
  <span class="asset-placeholder__label">Screenshot pending</span>
  <p>show the editor in Edit layout mode with the toolbar (Select, Draw wall, Draw partition, Add door, Add window, Add furnishing, Rescale plan, Fit floor plan) and the Save button in the header</p>
</div>

<style>
.asset-placeholder { border: 1px dashed var(--tessera-border); border-radius: 6px; padding: var(--tessera-spacing-md) var(--tessera-spacing-lg); background: var(--tessera-bg-secondary); }
.asset-placeholder__label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--tessera-text-light); margin-bottom: 0.25rem; }
</style>
