<script module>
  export const pageConfig = { title: 'Writing in the Document Designer' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Writing in the Document Designer</h1>

<h2>Inserting fields</h2>
<p>A field is a hole in the document that the real value drops into. Put the cursor exactly where the value goes, search the <strong>Fields</strong> tab (it matches the label and the path), and choose the field. It appears as a chip, for example <strong>Contract &rsaquo; Price</strong>.</p>
<p>Insert a field from your data.</p>
<ol class="process">
  <li>
    Put the cursor where the value belongs &mdash; a field is inserted at the cursor, mid-sentence if that is where you are.
  </li>
  <li>
    Search <strong>Search fields&hellip;</strong> in the Fields tab. Fields are grouped (Location, Customer, Contract) and each shows its kind and an example.
  </li>
  <li>Choose the field to insert it at the cursor.</li>
  <li>
    Select the chip to open <strong>Selection</strong> and set its <strong>Format</strong>, <strong>Transform</strong> and <strong>When empty, show</strong>.
  </li>
</ol>
<Callout type="tip">
<p>Give a fallback (&ldquo;When empty, show&rdquo;) to every field that is not guaranteed &mdash; a company name, a second line of an address, an end date on an open-ended contract. It stops a blank looking like a mistake. Money fields already have money formatting applied automatically, so do not add it again.</p>
</Callout>

<style>
.process li {
  margin-bottom: 0.5rem;
}
</style>
