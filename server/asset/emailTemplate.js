function welcomeSignupHTML (firstname){
    return (
        `<p> Dear ${firstname}, </p> ` 
+ "<p> Welcome to Hyde International, Thank you for signing up and we’re pleased and excited to welcome you as a member to join our Hyde Talent Project at Hyde International. You’re joining an amazing platform that brings all researchers who from a wide variety of academic backgrounds. </p> " 
+ "<p> Hyde International is committed to Providing International Cross-Cultural Solution and Opportunity for Organizations and Talents Worldwide. We are always here to looking forward to create more academic collaboration opportunities for you and your colleagues. </p> " 
+ `<p> If you’d like have more helpful tips about other academic project at Hyde International, please visit our <a href="https://www.linkedin.com/company/hyde-international-uk/?originalSubdomain=uk">LinkedIn</a> and <a href="http://www.hydeinternational.co.uk/">Hyde international website</a>. Hyde international are always here to help and provide support. </p> `

+ "<p> Kind regards, </p> " 

+ "Hyde International Management team <br/>"
+ "T: +44 (0) 207 712 1505 <br/>" 
+ "E: training@hyde-china.com <br/>"
+ "W: hydeInternational.co.uk <br/>"
+ "A: Hyde International (UK), 37th Floor, One Canada Square, Canary Wharf, London, United Kingdom, E14 5AA <br/>"
    )
}


function forgotPasswordHTML (firstname, resetUrl){
    return (
        `<p> Dear ${firstname}, </p>` 
 + "<p> We received your password reset request for Hyde talent Website, we’ve realized you might forget your password. As a security measure we have expired your existing password, you will need to set up a new password. </p> "      
 + "<p> To change your password, please click the link below and follow the instruction. </p> "
 + `<p> ${resetUrl} </p> `
 + "<p> If you did not request a new password, you can still contact us using the contact detail below. </p> "
 + `<p> Thanks for helping us keep your account secure. If you have trouble or questions about resetting your password, please contact our technology team through training@hyde-china.com or contact us on +44 (0) 207 712 1505. </p> `
 
 + "<p> Kind regards, </p> " 

 + "Hyde Technology team <br/>"
 + "T: +44 (0) 207 712 1505 <br/>" 
 + "E: training@hyde-china.com <br/>"
 + "W: hydeInternational.co.uk <br/>"
 + "A: Hyde International (UK), 37th Floor, One Canada Square, Canary Wharf, London, United Kingdom, E14 5AA <br/>" 
    )
}

module.exports = {
    welcomeSignupHTML,
    forgotPasswordHTML
}