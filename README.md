# Abstract
- Imagen is a text-to-image generator web app.
- Used NextJS with TypeScript for building this project.
- Used AuthJS for integrating Google SignIn Authentication, reference: [AuthJS](https://authjs.dev/)
- Used Prisma ORM for database access and management, reference: [Prisma](https://www.prisma.io/)
- Used Zod for Input Validation, reference: [zustand](https://github.com/pmndrs/zustand)
- Used ShadCN to integrate pre-built components, reference: [shadCN](https://ui.shadcn.com/)
- Used Framer-Motion for animating the components, reference: [Framer-motion](https://motion.dev/)
- Used NeonDB database for storing the users data, reference: [NeonDB](https://neon.com/)
- Used Pollination.ai for generating the images, refernece: [Pollination.ai](https://pollinations.ai/)
# Tech Stack
  - NextJS
  - TypeScript
  - TailwindCSS
  - AuthJS
  - Prisma
  - Framer-Motion
  - Zod
  - PostgreSQL
  - NeonDB


# Requirements Specification
  ## Functional Requirements
  - Text-to-Image Generation: Users can generate images from textual prompts using the Pollinations.ai API.
  - User Authentication: Users can log in using Google OAuth via Next-Auth to access personalized features.
  - Image History: Users can view their past generated images along with the corresponding prompts in the profile section.


  ## Non-Functional Requirements
  - High availability and performance.
  - User-friendly interface with responsive design


# High-level designs
## Conceptual Model
<img width="1600" height="704" alt="Conceptual_Model" src="https://github.com/user-attachments/assets/663c8544-15b8-482e-82a3-22bec633c569" />

## Deployment Diagram
<img width="1128" height="1261" alt="Deployment_Diagram" src="https://github.com/user-attachments/assets/118dcce8-9d70-4183-a4c5-0781e5d6d4b3" />



# Low-level designs
## ER Diagram
<img width="1500" height="1600" alt="ER_Diagram" src="https://github.com/user-attachments/assets/b8923a84-b71e-4aaf-9e92-cfd2efb797f6" />

## Data Flow Diagram
<img width="1229" height="639" alt="DFD_L0" src="https://github.com/user-attachments/assets/1b95bbb4-29bd-45b4-b614-16570fb51045" />
<img width="1481" height="574" alt="DFD_L1" src="https://github.com/user-attachments/assets/258c9b99-a1d0-4c75-97ef-a51eed0d24ac" />
<img width="1600" height="1282" alt="DFD_L2" src="https://github.com/user-attachments/assets/0f635ca2-dbd2-46b1-a04a-44fe3e039702" />

## Use Case Diagram
<img width="662" height="593" alt="Use_Case_Diagram" src="https://github.com/user-attachments/assets/e794f7bd-4321-47f1-95fb-246f4f9adb76" />

## Class Diagram
<img width="1600" height="1369" alt="Class_Diagram" src="https://github.com/user-attachments/assets/67e5eb3c-0840-4144-8420-c8b4dd6a1091" />

## Activity Diagram
<img width="830" height="1600" alt="Activity_Diagram" src="https://github.com/user-attachments/assets/47ac2b48-d6ee-4489-b520-e8b52d61f6a5" />

## Sequence Diagram
<img width="1124" height="1266" alt="Sequence_Diagram" src="https://github.com/user-attachments/assets/0c255101-8a77-4d65-9bca-4baf5c44bd1e" />

