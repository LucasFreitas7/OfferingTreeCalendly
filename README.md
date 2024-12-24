
# OfferingTree Calendly Clone

Thank you for the opportunity to work on this project. Below is an overview of the implementation, key highlights, and potential improvements.

## Key Highlights

- **Robust Architecture**: The project is well-structured, with a clear separation between views and controllers.
- **API Calls**: Leveraged API calls instead of relying solely on the mock data.
- **Service Integration**: Introduced a service layer to instantiate the API for better scalability.
- **Multi-User Support**:  
  - Supports multiple user profiles for easy addition of new users.  
  - Example: Access the system for **Arvind Menon** via `http://localhost:3000/arvind` or **Lucas Freitas** via `http://localhost:3000/lucas`.  
  - To add a new user, simply update the `people` object in the `data` folder.
- **Clean Architecture**: The project is designed to be easily interpretable and maintainable.

## Potential Improvements

1. **Testing**:  
   - Add unit tests.  
   - Introduce mutation testing.  
   - Implement Cypress for end-to-end testing.  
2. **Performance Optimization**:  
   - Use `useCallback` for functions to avoid unnecessary re-creations.  
3. **Responsiveness**:  
   - Enhance the design to support responsiveness, as the site currently works only in a web version.  
4. **Timezone Support**:  
   - Improve the implementation to handle and adapt to any timezone dynamically, allowing users from different regions to have an accurate scheduling experience.

## Getting Started

### Prerequisites

- Node.js
- A code editor (e.g., VS Code)

### Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/LucasFreitas7/OfferingTreeCalendly.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd OfferingTreeCalendly
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Start the development server:  
   ```bash
   npm run dev
   ```

## Feedback

I’m open to any feedback or suggestions. Please feel free to reach out with questions or requests for further adjustments.
