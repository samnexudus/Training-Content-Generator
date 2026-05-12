# Nexudus CLI — Context Enrichment Guide

The `nexudus` CLI connects to the live Nexudus Academy training environment and returns structured JSON via the `--agent` flag. Use this to enrich content with real, accurate data instead of generic examples.

## Why use the CLI?

- **Accuracy**: Use actual resource names, plan names, and settings from the training environment
- **Realism**: Demo scenarios feel concrete when they use real data
- **Verification**: Double-check navigation paths and entity names against the live API
- **Consistency**: Activities and examples match what trainees will see in their own spaces

## Quick commands

### Get plan/tariff names (for examples)
```bash
nexudus tariffs list --agent
```
**Returns:** List of all membership plans with pricing.

**Use in content:** Reference real plan names in examples.
- ✅ "Select the **Hot Desk (20 Hours per month)** plan"
- ❌ "Select a plan"

**Example from live data:**
- Hot Desk (20 Hours per month) — 250.0
- Flex Desk (Min 12 month commitment) — 50.0
- Private Office — 5500.0
- Dedicated Desk Plan (AM) — 250.0

### Get resource names (for demo scenarios)
```bash
nexudus resources list --agent
```
**Returns:** All bookable resources with details.

**Use in content:** Reference real resources when describing booking demos.
- ✅ "1. Select **Basement Conference** (a bookable conference room)."
- ❌ "1. Select any available conference room."

**Example from live data:**
- Basement Conference (Flex Room)
- [Other real resources in the Nexudus Academy space]

### Get resource types
```bash
nexudus resourcetypes list --agent
```
**Returns:** Types of resources (Flex Room, Dedicated Desk, Private Office, etc.)

**Use in content:** When explaining resource categories.

### Get member/coworker data (for activities)
```bash
nexudus coworkers list --agent
```
**Returns:** List of coworkers/members with profiles.

**Use in content:** Activity exercises can reference real member names.
- ✅ Activity: "Create a booking for Jamie Smith for next Tuesday 10am in Basement Conference."
- ❌ Activity: "Create a booking for a member."

### Verify business settings
```bash
nexudus businesssettings list --agent
```
**Returns:** All business configuration settings.

**Use in content:** Check what features are enabled, integrations active, etc.

### Look up specific entities
```bash
nexudus [entity] get <id> --agent
```
**Returns:** Full details of a single entity.

## Integration pattern

Before writing content, run these commands in sequence:

```bash
# Get all the live data you need
TARIFFS=$(nexudus tariffs list --agent)
RESOURCES=$(nexudus resources list --agent)
TYPES=$(nexudus resourcetypes list --agent)
MEMBERS=$(nexudus coworkers list --agent)

# Parse and extract key names to use in examples
```

Then in your content:
- Reference extracted plan names: "Select the **Hot Desk (20 Hours per month)** plan"
- Use real resource names: "Book **Basement Conference**"
- Mention real member names in activities: "Create a booking for Jamie"

## Example: Creating realistic demo instructions

**Without CLI (generic):**
```
1. Navigate to **Operations > Bookings**.
2. Click **+ Book resource**.
3. Select a plan from the dropdown.
4. Select a resource.
5. Click **Save**.
```

**With CLI (realistic):**
```
1. Navigate to **Operations > Bookings**.
2. Click **+ Book resource**.
3. Select the **Hot Desk (20 Hours per month)** plan from the dropdown.
4. Select **Basement Conference** (available for the selected date/time).
5. Click **Save**.

Note: This example assumes the training environment has the Basement Conference resource and Hot Desk plan configured as shown.
```

## Sample CLI responses (excerpts)

### Tariffs list response:
```json
{
  "ok": true,
  "data": [
    {
      "Name": "Hot Desk (20 Hours per month)",
      "Price": 250.0,
      "Currency": "USD"
    },
    {
      "Name": "Flex Desk (Min 12 month commitment)",
      "Price": 50.0,
      "Currency": "USD"
    },
    {
      "Name": "Private Office",
      "Price": 5500.0,
      "Currency": "USD"
    }
  ]
}
```

### Resources list response (excerpt):
```json
{
  "ok": true,
  "data": [
    {
      "Name": "Basement Conference",
      "ResourceTypeName": "Flex Room",
      "Description": "All you need to host your meetings and videoconferences...",
      "Projector": true,
      "Internet": true,
      "ConferencePhone": true
    }
  ]
}
```

## Best practices

1. **Run CLI before writing** — pull all context you need at the start
2. **Extract and reuse** — copy real names into your content
3. **Note the source** — if data changes, the training needs updating too
4. **Mark TBC if missing** — if a resource/plan doesn't exist yet, use `[TBC]`
5. **Mention the environment** — in notes, state this content assumes the standard Nexudus Academy configuration
