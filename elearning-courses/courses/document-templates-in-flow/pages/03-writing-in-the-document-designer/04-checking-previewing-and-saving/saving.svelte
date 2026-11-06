<script module>
  export const pageConfig = { title: 'Writing in the Document Designer' };
</script>

<script>
  import { Callout, Image } from 'tessera-learn';
</script>

<h1>Writing in the Document Designer</h1>

<h2>Checking, previewing and saving</h2>
<p>The right-hand end of the toolbar always says how the design stands: <strong>Everything looks good</strong>, <strong>N suggestions</strong>, or <strong>N problems to fix before saving</strong>. Problems block saving and the preview &mdash; the commonest is a field that no longer exists.</p>
<p><strong>Preview</strong> (in the header) answers the only question that matters before a document goes out: what will the customer actually receive? Choose <strong>Sample data</strong> to check wording, or <strong>A real record</strong> to check reality &mdash; ideally an awkward one with the least filled in. Switch <strong>Preview as</strong> from <strong>Page</strong> to <strong>PDF</strong>: the PDF, not the canvas, decides page breaks and where signature fields land.</p>
<Image
  src='$assets/preview-pdf.png'
  alt='The preview window in PDF mode, reporting how many signature fields were placed'
/>
<Callout type="important">
<p>Nothing is saved as you type &mdash; click <strong>Save</strong> in the header. The Designer keeps unsaved work in the browser, so a template you left unsaved offers to restore it, but that draft survives only the open tab. Render the PDF before sending anything for signature.</p>
</Callout>

