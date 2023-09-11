# HERNewsletter Project
---
## Links
- **Live Demo**: [View Here](https://venerable-puppy-122125.netlify.app/)
- **Testing Steps**: [Read Guide](https://scribehow.com/shared/Step-by-Step_Guide_How_to_Sign_Up_for_HERNewsletter_DEMO__DmQvRSpeTNWTij9p2-T_5g)
- **Original Fork**: [GitHub Repository](https://github.com/yedidromero/HERnewsletter)
- **Pitch**: [View Here](https://github.com/yedidromero/HERnewsletter/blob/main/Final.mp4)
---
# Brief Description

HER NEWS is a decentralized application (dApp) offering the latest insights on blockchain and Web3. But it's not just about news; it's also a place to find job opportunities and career growth. Leveraging iExec technology, you can monetize your data securely while still maintaining privacy. DAOs and other Web3 organizations can take advantage of this platform to reach out to their communities better.
---
# How does it work?

- **Connect Your Wallet**: One crypto wallet is all you need.
- **Stay Updated**: Click "Learn More" to catch up on news.
- **Get Paid for Your Data**: Click "Get Started" to define your email preferences. Decide how many emails you want and at what price. No spam, just content you approve—and get paid for.
- **Data Security**: We encrypt your email to make sure your data stays private.

**Example**: Suppose you're a student from Latin America looking for a full-time job. After selecting "Get Started," you'll set the frequency of emails you're willing to receive and the price for each. You earn money and get emails only on topics you care about.

## User Onboarding with iExec Security

### Sign Up and Data Encryption
- **User Signup**: Participants start by filling out a newsletter signup form.
- **Encrypt Email using iExec's `protectData`**: Clicking 'Subscribe' triggers immediate email encryption via iExec's `protectData` method.
- **Blockchain and Smart Contract**: Encrypted emails are stored on the blockchain, managed by an iExec-facilitated smart contract which also governs payments and permissions.

## Personalizing Your HERNewsletter Experience

- **Secure Access via iExec's `grantAccess`**: We utilize iExec’s `grantAccess` method to obtain authorized access to the user's encrypted email.
- **Set Your Preferences**: Using iExec's user-centric technology, you can specify the volume of emails you wish to receive and the payment you expect for each.

## How We Handle Your Data

- **Conditional Data Storage**: User data, encrypted emails, and preferences are securely stored in our Supabase database only after obtaining user permissions via iExec's technology.
- **Note on Data Integrity**: All data is stored in its original form except the email, which is encrypted via iExec's technology.

## Managing Our Audience

- **Admin Interface**: Team members filter users based on demographics and preferences.
- **Compliance and Budget Checks**: Before sending emails, we ensure we comply with user-set preferences and have sufficient budget.

## Private Emailing via Web3Mail

- **Individual Emailing with `sendEmail`**: For now, we use Web3Mail's `sendEmail` method for one-by-one email sending to wallet accounts without disclosing email addresses.
- **Future Outlook**: We hope to integrate bulk email sending capabilities to make the process less tedious for DAO admins.

---

# How To Run

### Run locally
#### Steps
1. Install dependencies:
    ```
    yarn install
    ```
2. Start the development server:
    ```
    yarn start
    ```
3. Configure Environment Variables:
    - Create a `.env` file in your project root.
    - For `VITE_WALLET_CONNECT_PROJECT_ID`, you'll need to create an account with WalletConnect Cloud and get your project ID.
    - For `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`, you'll need to set up a Supabase database and obtain these details.
    
    Fill in the `.env` file as shown below:
    ```env
    VITE_WALLET_CONNECT_PROJECT_ID = '<Your_WalletConnect_Project_ID>'
    VITE_SUPABASE_URL = '<Your_Supabase_URL>'
    VITE_SUPABASE_KEY = '<Your_Supabase_Key>'
    ```
4. Open your web browser and navigate to localhost.

### Build for production

## Steps
1. Build the project:
    ```
    yarn build-proj
    ```
--- 

# Database Table Configuration

We use a Postgres database managed by Supabase to store and manage user data securely. The database table is designed with scalability and data integrity in mind. Below is our table schema for storing subscribed users:

```sql
CREATE TABLE public.subscribed_users (
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  encrypted_email TEXT NULL,
  occupation TEXT NULL,
  category TEXT NULL,
  search_status TEXT NULL,
  region TEXT NULL,
  age_range TEXT NULL,
  email_count_limit INTEGER NULL,
  email_price NUMERIC NULL,
  CONSTRAINT subscribed_users_pkey PRIMARY KEY (user_id)
) TABLESPACE pg_default;
```

---
# Acknowledgments
A heartfelt thank you to our community for inspiring us to find avenues for education, inclusion, and data monetization on their behalf. Our gratitude also extends to the iExec team for enabling us to develop a dApp that prioritizes user privacy and consent. Their guidance and the enriching experience in Paris have been invaluable.
