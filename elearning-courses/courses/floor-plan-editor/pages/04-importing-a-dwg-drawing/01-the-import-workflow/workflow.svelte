<script module>
  export const pageConfig = { title: 'Importing a DWG drawing' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Importing a DWG drawing</h1>

<p>If you have the architect's drawing, you do not have to redraw the floor. The DWG importer reads a CAD drawing, asks which layers are walls, doors and rooms, and converts it into a floor plan you can keep editing. It lives in the editor, behind <strong>Import DWG</strong>.</p>
<Callout type="important">
<p>Import into an empty floor plan. If the layout already has content, the importer refuses with “This floor plan already has content”. Create a new floor plan for the drawing.</p>
</Callout>
<h2>The import workflow</h2>
<p>Follow these steps to convert a CAD drawing into a floor plan.</p>
<ol class="process">
  <li>
    Open the editor on an <strong>empty floor plan</strong>, then click <strong>Import DWG</strong>.
  </li>
  <li>
    Drop the file on <strong>Select a DWG file</strong> or choose it. Maximum 25 MB. If an import already exists for this plan you can <strong>Continue existing import</strong> or <strong>Upload new DWG</strong>.
  </li>
  <li>
    Pick the space — a drawing holds one or more spaces; choose the one with the floor in it.
  </li>
  <li>Map the content: give every layer you want a role, and set the scale.</li>
  <li>
    Convert and review — Nexudus builds the floor plan and shows you what it made before anything is applied.
  </li>
  <li><strong>Apply</strong>, then <strong>Save</strong> in the editor.</li>
</ol>
<p>Applying returns you to Edit layout with the converted plan in place. It is not stored until you choose Save.</p>
<div class="asset-placeholder">
  <span class="asset-placeholder__label">Screenshot pending</span>
  <p>show the Import DWG layer mapping screen: layers on the left, the drawing in the middle, role settings on the right</p>
</div>

<style>
.process li {
  margin-bottom: 0.5rem;
}
.asset-placeholder { border: 1px dashed var(--tessera-border); border-radius: 6px; padding: var(--tessera-spacing-md) var(--tessera-spacing-lg); background: var(--tessera-bg-secondary); }
.asset-placeholder__label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--tessera-text-light); margin-bottom: 0.25rem; }
</style>
