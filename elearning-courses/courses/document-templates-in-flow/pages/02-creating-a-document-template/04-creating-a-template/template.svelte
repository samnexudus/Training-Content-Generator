<script module>
  export const pageConfig = { title: 'Creating a document template' };
</script>

<script>
  import { Image } from 'tessera-learn';
</script>

<h1>Creating a document template</h1>

<h2>Creating a template</h2>
<p>Click <strong>Create document template</strong> to open a three-step wizard rather than a form.</p>
<p>Follow these steps to create a new document template.</p>
<ol class="process">
  <li>
    Navigate to <strong>Sales &amp; relationships &rsaquo; Document Templates</strong> and click <strong>Create document template</strong>.
  </li>
  <li>
    Name the template and pick the <strong>Location</strong> it belongs to. The name is shown to your team and used as the file name of generated documents.
  </li>
  <li>
    Say what it is about: <strong>Customer</strong>, <strong>Contract</strong>, <strong>Proposal</strong> or <strong>Booking</strong>. Each card explains what data that choice gives the template.
  </li>
  <li>
    Choose where to start: <strong>A starter</strong>, <strong>A blank page</strong>, <strong>A Word document</strong>, or <strong>HTML or Liquid</strong>. The card you pick decides which editor the template gets for the rest of its life.
  </li>
  <li>Finish the wizard to open the template in its editor, ready to edit.</li>
</ol>
<p>A starter is copied, not linked: editing it afterwards changes only your template, and a later improvement to the starter never reaches templates already made from it.</p>
<Image
  src='$assets/wizard-about.png'
  alt='Step two of the create wizard: choosing what the document is about'
/>

<style>
.process li {
  margin-bottom: 0.5rem;
}
</style>
