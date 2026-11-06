<script module>
  export const pageConfig = { title: 'Importing a DWG drawing' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Importing a DWG drawing</h1>

<h2>Scale, tolerances and review</h2>
<p>Tell Nexudus the <strong>Drawing units</strong> — millimetres, centimetres, metres, inches or feet. If the drawing is not to a known unit, measure a distance you know with the measuring tool in the preview and enter its <strong>Actual distance</strong>.</p>
<p><strong>Advanced settings</strong> holds the tolerances the conversion works to: endpoint snap, curve chord, minimum segment, wall width and Z tolerance, all in millimetres. Leave them alone unless the result tells you otherwise — a drawing that converts with gaps at corners usually wants a larger endpoint snap.</p>
<p>Before anything is applied you get a <strong>Conversion summary</strong> counting the walls, partitions, areas, doors, windows and source objects, and a <strong>Diagnostics</strong> list where the converter reports what it could not do cleanly — notes in grey, warnings in amber.</p>
<Callout type="tip">
<p>Read the area count first. Areas are what become your units, so a conversion with walls but no areas usually means no layer was given the Room boundary role — go back to Map content rather than applying.</p>
</Callout>

