<script module>
  export const pageConfig = { title: 'Importing a DWG drawing' };
</script>

<script>
  import { Accordion, AccordionItem } from 'tessera-learn';
</script>

<h1>Importing a DWG drawing</h1>

<h2>Layer roles</h2>
<p>Every layer gets a <strong>role</strong> that decides what Nexudus builds from it:</p>
<Accordion>
  <AccordionItem title='Structure'>
<p><strong>Wall centerline</strong> / <strong>Wall boundaries</strong> become walls; <strong>Partition centerline</strong> becomes partitions; <strong>Room boundary</strong> becomes areas, which become your units.</p>
  </AccordionItem>
  <AccordionItem title='Openings and circulation'>
<p><strong>Door</strong> and <strong>Window</strong> become openings in the walls; <strong>Stairs or elevator</strong> becomes vertical circulation; <strong>Furnishing or desk block</strong> becomes furnishings.</p>
  </AccordionItem>
  <AccordionItem title='Tracing and ignore'>
<p><strong>Tracing only</strong> keeps the layer as an image to trace over; <strong>Ignore</strong> builds nothing from it.</p>
  </AccordionItem>
</Accordion>
<p>Roles are guessed from the layer names, which is usually right for a drawing with conventional naming: a layer called <em>A-DOOR</em> arrives as <strong>Door</strong>, <em>A-WALL</em> as <strong>Wall boundaries</strong>, and anything that looks like annotation, dimensions, hatching or a grid as <strong>Tracing only</strong>. Check the guesses — they are a starting point, not a reading of the drawing.</p>

