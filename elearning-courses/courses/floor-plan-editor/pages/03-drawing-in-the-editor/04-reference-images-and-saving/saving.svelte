<script module>
  export const pageConfig = { title: 'Drawing in the editor' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Drawing in the editor</h1>

<h2>Reference images and saving</h2>
<p>The <strong>Reference images</strong> panel holds two slots: a <strong>Tracing image</strong> (an editing aid — an architect's drawing to trace over) and a <strong>Background image</strong> (shown with the published floor plan). Each slot has an opacity slider and a scale in millimetres per image pixel. Image changes are stored when you save the floor plan, like everything else.</p>
<p>If the plan changed while you were working, saving raises <strong>Floor plan changed</strong>, naming who changed it and when. You can <strong>Overwrite changes</strong>, <strong>Keep editing</strong>, or <strong>Reload latest and discard my changes</strong>. There is no merge — whichever you pick, one version of the layout survives, so agree who is drawing before two people open the same floor.</p>
<Callout type="warning">
<p>Nothing is saved until you choose Save. Leaving the editor with unsaved changes loses your work.</p>
</Callout>

