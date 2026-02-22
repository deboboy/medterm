## MedTerm
This web application is a mobile-first pocket terminal interface for doctors to manage AI agents used in their practice or field work.

## Data
MedTerm will be built then tested with synthetic data first to validate the utility of the pocket terminal interface. Synthetic data will map to the data interfaces found in /lib/agent-data.ts.

Synthetic data will be generated with the most appropriate model available from OpenRouter inference for medical data. The synthetic data can be stored on the file system or in a non-relational storage system in the cloud. 

## Agents
The AI agent for each interface found in /lib/agent-data.ts will be run through OpenRouter inference and models available through OpenRouter.  Each AI agent should have access to the tools necessary to provide the information displayed in the pocket terminal interface for that agent.

## Authentication
Access to the web application should be role based with authorization through a system that provides two factor authentication.   

