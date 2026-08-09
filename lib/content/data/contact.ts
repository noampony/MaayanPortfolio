/**
 * Contact content - used by the Contact section and the floating business card.
 *
 * Email, phone, and LinkedIn are sourced from the owner's CV ("Maayan Pony - CV" header).
 * The CV writes the phone as `0542377256`; it is stored here in international form so the
 * `tel:` URI the Contact section builds is dialable from anywhere. The CV's LinkedIn link is
 * bare (`www.linkedin.com/in/maayanpony`) - normalised to `https://` here (never link a
 * personal profile over plaintext HTTP) and stored tracking-param-free.
 *
 * Phone publication is gated on owner confirmation: publishing the number increases spam
 * risk and is acceptable only when intentionally confirmed. The owner has confirmed
 * publication, so the phone is included.
 *
 * `location` is the country only. The CV header says "Tel Aviv"; the owner chose to publish
 * the country rather than the city.
 *
 * The contact form is not enabled.
 */

import type { Contact } from "../types";
import { validateContact } from "../validate";

const contactData = {
  heading: "Get In Touch",
  message:
    "Let's Work Together! Have something interesting to work on? Feel free to contact me.",
  email: "Maayanpony11@gmail.com",
  linkedIn: "https://www.linkedin.com/in/maayanpony/",
  phone: "+972 54 237 7256",
  location: "Israel",
  preferredContactMethod: "Email",
  contactFormEnabled: false,
} as const;

export const contact: Contact = validateContact(contactData);
