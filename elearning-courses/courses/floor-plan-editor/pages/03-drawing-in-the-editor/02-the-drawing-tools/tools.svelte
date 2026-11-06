<script module>
  export const pageConfig = { title: 'Drawing in the editor' };
</script>

<script>
  import { Accordion, AccordionItem } from 'tessera-learn';
</script>

<h1>Drawing in the editor</h1>

<h2>The drawing tools</h2>
<p>Edit layout gives you <strong>Select</strong>, <strong>Draw wall</strong>, <strong>Draw partition</strong>, <strong>Add door</strong>, <strong>Add window</strong>, <strong>Add furnishing</strong>, <strong>Rescale plan</strong> and <strong>Fit floor plan</strong>, with <strong>Undo</strong> and <strong>Redo</strong> beside them. <strong>Import DWG</strong> and <strong>Reference images</strong> sit at the end of the toolbar.</p>
<p>Selecting something opens its inspector on the right. An area shows its <strong>Area name</strong>, <strong>Color</strong>, <strong>Transparency</strong>, <strong>Area size</strong> and approximate dimensions. New areas arrive named <em>New office</em> and new assets <em>New desk</em>, white and mostly transparent, so you can see the drawing underneath while you place them.</p>
<h2>Keyboard shortcuts</h2>
<p>The <strong>Keyboard shortcuts</strong> panel lists them, and they are worth learning if you draw more than one floor:</p>
<Accordion>
  <AccordionItem title='Tools'>
<p><strong>1…6</strong> switch between walls, partitions, doors, windows, furnishings and stairs. <strong>Esc</strong> or <strong>Ctrl + Space</strong> returns you to the select tool.</p>
  </AccordionItem>
  <AccordionItem title='Grid and zoom'>
<p><strong>Ctrl + S</strong> toggles grid snapping, <strong>Ctrl + G</strong> toggles the grid itself, and <strong>Ctrl + F</strong> zooms to fit.</p>
  </AccordionItem>
  <AccordionItem title='Editing'>
<p><strong>Ctrl + Z</strong> undoes, <strong>Ctrl + Shift + Z</strong> redoes, and <strong>Delete</strong> removes the selection.</p>
  </AccordionItem>
</Accordion>

