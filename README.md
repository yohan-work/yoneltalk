# RelayDesk prototype

RelayDesk is an interactive front-end prototype for a global IT support workspace.
It demonstrates the API-incident flow from customer submission through an agent
inbox, internal notes, support-case creation, incident linking, and simulated
engineering handoff.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser. Use the view switcher to move
between the customer flow and the support workspace.

## Prototype boundaries

- All state is in memory and is reset on refresh.
- Customer, ticket, incident, and engineering data is seeded demo data.
- No authentication, real-time messaging, external APIs, or AI services are used.
