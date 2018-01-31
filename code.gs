function entryPoint() {
  var inboxThreads = GmailApp.getTrashThreads();
  inboxThreads.forEach(function(thread) {
    var message = thread.getMessages()[0]; // Get first message
    var mailAddress;
    
    if(message.getTo().indexOf("<") != -1){
      // if there is a < , we need to extract the mail from < and >
      mailAddress = message.getTo().substring(message.getTo().indexOf("<")+1, message.getTo().indexOf(">"));
    } else{
      // else, mail address is directly given
      mailAddress = message.getTo();
    }
    
    // now we have the mail address, check if there is a +, check only with my own mail address 
    if(message.getTo().indexOf("mathieu.passenaud+") != -1 ){
      Logger.log(mailAddress);
      
      // extract the tag, between + and @
      var labelName = mailAddress.substring(mailAddress.indexOf("+")+1, mailAddress.indexOf("@"));
      
      // check if the label exists
      var label = GmailApp.getUserLabelByName(labelName);
      
      if(label == null){
        label = GmailApp.createLabel(labelName);
      }
      thread.addLabel(label);
    }
  });
}
