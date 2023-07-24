// email-controller.js
import Email from "../model/email.js";

export const saveSentEmails =(request, response) => { // Change "saveSendEmails" to "saveSentEmails"
    try {
        const email = new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

// Rest of the code remains the same...
