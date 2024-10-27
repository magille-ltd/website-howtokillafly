# Fly Control Strategy Blog

## Project purpose

This is a directory and blog about fly control strategies. Purpose is to help educate people about flies and how to control them.

## Project status

MVP with voting system in progress.

## Project stack

- Remix
- Tailwind CSS
- MongoDB (for storing votes)
- Mongoose (for database interaction)

## Development plan

- [x] Create initial MVP
- [ ] Implement voting system (in progress)
  - Set up MongoDB and Mongoose
  - Create Vote model
  - Implement voting API
  - Add fly icon for voting UI
- [ ] Let people comment on strategies
- [ ] Let people comment on blog posts
- [ ] Let people submit pictures of flies they've caught

## Voting System Implementation (Current Focus)

1. Database Integration (MongoDB and Mongoose)
   - Set up MongoDB Atlas cluster
   - Install Mongoose in the project
   - Create Mongoose schema for votes
   - Implement voting API endpoint

2. User Voting System
   - Create a Vote model in Mongoose
   - Implement voting API endpoint (increment/decrement vote count)
   - Add voting UI component (fly icon) to strategy pages
   - Update strategy display to include vote counts
   - Allow multiple votes per strategy (no user authentication required)

3. UI/UX for Voting
   - Design and implement a fly icon for voting
   - Add click animation for vote interaction
   - Display vote count next to each strategy

4. Testing and Quality Assurance
   - Write unit tests for the Vote model and API endpoint
   - Perform thorough testing of the voting feature

5. Deployment and Monitoring
   - Update deployment scripts to include MongoDB connection
   - Set up monitoring for the voting system

Next steps after voting system implementation will be determined based on project priorities.


SideSideProject: FLY.JS - Add shit and flies to your page.