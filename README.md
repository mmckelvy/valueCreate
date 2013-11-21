ValueCreate
======================

## what it is: 
ValueCreate is a fully functional valuation model packaged in a web application. It allows you to quickly compute a company's value using a minimal number of standard financial inputs.  

## how it works:  
Fill in the "new company" input form with your company's characteristics.  Click submit.  The value of your company will be returned along with a graphical breakdown of the key value contributors.  If you want to access a company you have already created, click the "existing company" link and select your desired company.  
  
## valuation methodology:  
ValueCreate uses the "buyout" valuation method, the standard method employed by most private equity and venture capital firms.  The buyout method values a company by calculating its hypothetical equity value at the end of a 5 year hold period and solving for a beginning equity value that, when increased over the hold period by the target rate of return, is equivalent to the ending equity value.  The beginning enterprise value (the total value of a company) is then calculated by adding the initial debt financing (if any) to the beginning equity value.  

## who it's for:  
ValueCreate is for business owners, investment bankers, private equity professionals, venture capital professionals, and anyone who wants to better understand the value of a given business.  It's perfect for quickly getting a sense of a company's worth ahead of a pitch, indication of interest, or even real time during meetings and negotiations.

## technologies:  
I built ValueCreate with the usual front-end tools: HTML5, CSS3, JavaScript, and jQuery.  On the back-end I am using Node.js, Express, MongoDB, and Mongoose.  For templating I am using Jade and Handlebars. 
