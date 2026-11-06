<script module>
  export const pageConfig = { title: 'Creating a document template' };
</script>

<script>
  import { Accordion, AccordionItem, Callout } from 'tessera-learn';
</script>

<h1>Creating a document template</h1>

<h2>The three kinds of template</h2>
<p>Every template is one of three things, and <strong>which one is decided when you create it</strong>:</p>
<Accordion>
  <AccordionItem title='Designer'>
<p>The default choice, written in the Document Designer inside Flow. It is the only editor where you pick fields from a list, add conditions and repeats, place signature lines, and see a live preview. Use it almost always.</p>
  </AccordionItem>
  <AccordionItem title='Classic HTML'>
<p>Written as HTML with <strong>Liquid</strong> in a code editor inside Flow, for example <code>&#123;&#123; Coworker.FullName &#125;&#125;</code> for a value and <code>&#123;% if %&#125;</code> for a condition. Choose this when you already have working HTML and Liquid, or need something the Designer cannot express.</p>
  </AccordionItem>
  <AccordionItem title='Word'>
<p>An uploaded .docx with merge fields, edited in Microsoft Word rather than in Flow. Choose this when you have a .docx that must stay a .docx. An uploaded Word file must be <strong>10 MB or smaller</strong>.</p>
  </AccordionItem>
</Accordion>
<Callout type="important">
<p>The editor type and what the document is about are both set once, at creation, on a Designer template. There is no way to turn a Classic template into a Designer one, and going the other way (Detach) throws the design away. Getting these two right at creation is worth a minute&rsquo;s thought &mdash; everything else about a template can be changed later.</p>
</Callout>

