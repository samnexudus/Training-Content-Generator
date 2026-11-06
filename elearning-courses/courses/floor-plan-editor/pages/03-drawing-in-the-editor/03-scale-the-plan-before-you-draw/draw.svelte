<script module>
  export const pageConfig = { title: 'Drawing in the editor' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Drawing in the editor</h1>

<h2>Scale the plan before you draw</h2>
<p>The drawing needs to know what a metre is before areas mean anything. Do this before drawing in earnest.</p>
<ol class="process">
  <li>Choose <strong>Rescale plan</strong> in the toolbar.</li>
  <li>
    Draw a line along something you know the length of — a doorway or a wall.
  </li>
  <li>Enter that length in the <strong>Rescale floor plan</strong> dialog.</li>
  <li>Click <strong>Apply scale</strong>.</li>
</ol>
<p>The whole plan is rescaled. Unit areas feed occupancy reporting and the target price per square metre, so a plan scaled afterwards moves numbers you may already have reported.</p>
<h2>Link areas to units</h2>
<p>Drawing an area or an asset that is not yet linked to a floor plan unit opens <strong>Assign floor plan unit</strong>, with two tabs: <strong>Create new</strong> — give it a name and Nexudus creates the unit and links it — and <strong>Assign existing</strong> — pick one of the units that has no shape yet.</p>
<Callout type="info">
<p>This is the join between the drawing and everything commercial. A shape with no unit is decoration; a unit with a shape can be assigned, booked, reported on and shown to members.</p>
</Callout>

<style>
.process li {
  margin-bottom: 0.5rem;
}
</style>
