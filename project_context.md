### **File 1 (REVISED): `project_context.md`**

**Version: 2.0 (Definitive Edition)**
**Last Updated:** July 16, 2025

This document is the **Single Source of Truth** for the Dbanyan Group project. All development, design, and strategic decisions must align with this specification.

#### **PART 1: THE STRATEGIC OVERVIEW**

**1.1. Project Mission:** To architect and deploy a high-performance, visually appealing, and secure e-commerce platform for the Dbanyan Group. The primary goal is to drive online sales by building user trust through **comprehensive Moringa education**, interactive awareness content, and a premium, engaging user experience that feels alive and encourages repeated visits.

**1.2. Brand Identity & Voice:**

  * **Core Pillars:** Purity, Nature, Wellness, Trust, **Education & Awareness**.
  * **Voice/Tone:** Educational but accessible, scientific but not clinical, premium but not exclusive. All copy should be calm, confident, and inspiring. **The experience should feel energetic, interactive, and alive - never dull or encyclopedic.**
  * **Keywords:** Moringa, Natural, Preservative-Free, Health, Vitality, Pure, Organic, **Education, Awareness, Interactive Learning**.
  * **UX Philosophy:** Create a sophisticated, responsive experience that adapts perfectly to any screen size and zoom level. Every interaction should feel intentional and engaging, making users want to return.

**1.3. Target Audience Personas:**

  * **Persona A: "Health-Conscious Helen"**
      * **Demographics:** 28-40, living in a Tier-1 or Tier-2 Indian city.
      * **Behavior:** Researches products online extensively, reads ingredient lists and reviews, values brand story and ethics. Is skeptical of unsubstantiated health claims.
      * **Needs:** Clear, factual information; social proof (reviews); clean, aesthetic design; transparent ingredient lists.
  * **Persona B: "Solution-Seeker Sam"**
      * **Demographics:** 40+, may be experiencing specific health concerns (e.g., poor metabolism, low energy).
      * **Behavior:** Looks for natural alternatives to traditional medicine. Is goal-oriented and wants to know "how this will solve my problem."
      * **Needs:** Benefit-driven headlines, clear explanations of how moringa works, easy navigation, and a straightforward purchasing process.

#### **PART 2: THE FUNCTIONAL BLUEPRINT (FEATURE SPECIFICATIONS)**

This section details every feature with user stories, functional requirements, and technical implementation notes.

**2.1. Feature: The Landing Page (Educational Journey)**

  * **User Story:** "As a new visitor, I want to be captivated by an interactive, educational journey about Moringa that feels alive and engaging, making me understand its benefits and want to explore the premium products."
  * **Functional Requirements (FR):**
    1.  **FR1.1 (Hero Section):** Must display a full-width, auto-playing, muted, looping background video. A clear, compelling headline and a primary CTA button ("Discover Moringa's Power") must be overlaid with sophisticated animations.
    2.  **FR1.2 (Interactive Moringa Education Hub):** A comprehensive, visually stunning section explaining Moringa benefits with interactive elements, animations, and engaging micro-interactions.
    3.  **FR1.3 (Interactive Moringa Tree Graphic):** A beautifully illustrated, interactive SVG of the moringa tree (leaves, seeds, roots). Hovering/clicking each part triggers smooth animations and detailed educational popups with real images and comprehensive benefit explanations.
    4.  **FR1.4 (Health Benefits Showcase):** A dynamic section connecting specific health issues to Moringa's benefits, using sophisticated animations, icons, and benefit-oriented copy that feels alive and engaging.
    5.  **FR1.5 (Premium Product Showcase):** A sophisticated grid displaying the 4 main products with premium design treatment. Each card shows high-quality product images, compelling descriptions, prices, and interactive CTAs. Design must match the reference aesthetic.
    6.  **FR1.6 (Vision & Education Section):** A dedicated section combining company vision with educational content about Moringa's purity and preservation-free nature.
    7.  **FR1.7 (Enhanced Footer):** Multi-column footer with newsletter signup, educational links, and social proof elements.
  * **Technical Implementation Notes:**
      * The page will be a React component.
      * The interactive graphic will be an SVG component animated with **Framer Motion's** `whileHover` prop.
      * Product showcase data will be fetched using **TanStack Query** from the backend.

**2.2. Feature: Products & Product Details Page**

  * **User Story:** "As a potential customer, I want to see all available products and be able to click on one to get all the information I need to make a purchase decision."
  * **Functional Requirements (FR):**
    1.  **FR2.1 (Product Detail View):** Must have an image gallery with multiple product shots.
    2.  **FR2.2 (Information Layout):** Must clearly display product name, a detailed benefit-oriented description, price, and a list of ingredients.
    3.  **FR2.3 ("No Preservatives" Highlight):** A visually distinct badge or section must emphasize this key feature.
    4.  **FR2.4 (Buy Now Button):** A prominent CTA button to add the item to the cart. This button must be disabled if the product's inventory quantity is zero.
  * **Technical Implementation Notes:**
      * This will be a dynamic route in React Router (e.g., `/products/:productId`).
      * The `productId` will be used to fetch detailed product data, including inventory count, from the FastAPI backend.
      * The state of the "Buy Now" button will be conditionally controlled by the `quantity` field in the fetched data.

**2.3. Feature: Full Inventory Management System**

  * **User Story:** "As the site admin, I want the website to automatically track product stock levels to prevent overselling and to easily update quantities when we receive new stock."
  * **Functional Requirements (FR):**
    1.  **FR3.1 (Schema):** The `Product` model in MongoDB must have a `quantity` field (Type: Integer).
    2.  **FR3.2 (Decrement Logic):** Upon successful payment confirmation for an order, the backend must atomically decrement the `quantity` for each product in that order.
    3.  **FR3.3 (Stock Check):** The API must prevent adding an item to the cart if its quantity is 0.
    4.  **FR3.4 (Admin Interface):** The admin panel must have a dedicated page where an admin can view a table of all products and their current quantities, and be able to input a new number to update the stock for each.
  * **Technical Implementation Notes:**
      * The decrement logic in the FastAPI `complete_order` endpoint must be robust, ideally within a transaction if the setup allows, to ensure data integrity.
      * The admin interface will be a controlled form built in the React admin panel.

**2.4. Feature: Cart & Checkout Flow**

  * **User Story:** "As a customer, I want a simple, clear, and secure process to review my cart, enter my shipping details, and pay for my order."
  * **Functional Requirements (FR):**
    1.  **FR4.1 (Progress Bar):** The checkout page must feature a visual progress bar with steps: `Cart` -> `Shipping` -> `Payment` -> `Confirmation`.
    2.  **FR4.2 (Details Form):** A form must capture buyer details: Name, Mobile Number, Address, Email.
    3.  **FR4.3 (Coupon Code):** An input field must allow users to apply a coupon code.
    4.  **FR4.4 (Payment Gateway):** The "Proceed to Payment" button will invoke the **Razorpay** checkout modal.
    5.  **FR4.5 (Confirmation):** Upon successful payment, the user is redirected to a confirmation page and receives a confirmation email.
  * **Technical Implementation Notes:**
      * The checkout form will be managed using **React Hook Form** for performance and validation.
      * The entire checkout state will be managed by **Zustand**.
      * The backend will have endpoints to validate coupon codes and to create an order in the Razorpay API.

**2.5. Feature: Consultant AI Chatbot**

  * **User Story:** "As a user, I want an instant way to get my questions answered about products or my orders, without having to search the whole site or wait for an email response."
  * **Functional Requirements (FR):**
    1.  **FR5.1 (UI):** A floating chat icon will open a chat window.
    2.  **FR5.2 (Quick Starters):** The chat window will initially display 3-4 clickable buttons with predefined questions (e.g., "What are the benefits of Moringa?").
    3.  **FR5.3 (RAG for General Queries):** For general questions, the system will search a **Qdrant** vector database containing all site content and feed the relevant context to the Gemini API to generate a factual answer.
    4.  **FR5.4 (Personalized Queries):** If a user is logged in, the chatbot must be able to answer questions like "Where is my order?" by securely fetching the user's order data from the backend.
    5.  **FR5.5 (Modular Prompts):** The prompt engineering will be highly modular, separating system identity, rules, context, and the user query for maximum scalability.
  * **Technical Implementation Notes:**
      * FastAPI backend will have endpoints: `/chat/general` and a protected `/chat/user`.
      * When the server starts, it will "embed" all product and site info into a Qdrant collection.
      * We will use the official Google AI and Qdrant Python clients on the backend.

**2.6. Feature: Admin Console**

  * (This section covers requirements from 2.3 and 2.4)

**2.7. Feature: Detailed Footer**

  * **Functional Requirements (FR):**
    1.  **FR7.1 (Multi-Column Layout):** Must be a 4-column layout.
    2.  **FR7.2 (Column Content):**
          * Column 1 (Navigation): Links to Home, Products, About Us, Contact Us.
          * Column 2 (Legal): Links to Privacy Policy, Terms & Conditions, Shipping/Returns.
          * Column 3 (Contact): Office Address, Email, Phone.
          * Column 4 (Connect): Social Media Icons, Newsletter Signup Form.
  * **Technical Implementation Notes:**
      * The newsletter form will POST to a simple FastAPI endpoint that stores the email in a `subscribers` collection in MongoDB.

#### **PART 3: THE TECHNICAL ARCHITECTURE**

**3.1. Tech Stack (Finalized):**

  * **Frontend:** React (built with **Vite**), Mantine UI, Tailwind CSS, Framer Motion, TanStack Query, Zustand, React Hook Form, `react-helmet-async`.
  * **Backend:** FastAPI (Python), Motor (for async MongoDB), Qdrant client, Google AI client.
  * **Database:** MongoDB, Qdrant.
  * **Payment Gateway:** Razorpay.

**3.2. Repository & Deployment Plan:**

  * **Repository Structure:** Two separate repositories on GitHub (`dbanyan-frontend`, `dbanyan-backend`).
  * **Deployment Flow:**
    1.  **Frontend:** `dbanyan-frontend` repo deployed on **Netlify**. Continuous deployment triggered on `git push` to the main branch.
    2.  **Backend:** `dbanyan-backend` repo deployed on **Render**. Continuous deployment triggered on `git push` to the main branch.
    3.  **Database:** Hosted independently on **MongoDB Atlas**.
    4.  **Vector DB:** Hosted independently on **Qdrant Cloud**.
  * **Environment Management:** All secrets (database connection strings, API keys, JWT secrets) will be managed exclusively through environment variables in Render and Netlify. **No secrets will ever be hardcoded in the source code.**
