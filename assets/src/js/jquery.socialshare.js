(function($) {
    $.fn.socialshare = function(options) {
        var settings = $.extend({
            siteDomain  : window.location.origin,
            targetBlank  : false
        }, options);
        function getFacebookShareUrl(url){
            return 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);
        }
        function getTwitterShareUrl(url, tweet_copy){
            return 'https://twitter.com/home?status='+encodeURIComponent(tweet_copy)+'%20'+encodeURIComponent(url);
        }
        function getLinkedinShareUrl(url, title, summary, source){
            return 'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(summary)+'&source='+encodeURIComponent(source);
        }
        function getGooglePlusShareUrl(url){
            return 'https://plus.google.com/share?url='+encodeURIComponent(url);
        }
        function getEmailShareLink(url, subject, body){
            window.location = "mailto:?subject="+subject+"&body="+body+" "+url;
            return "mailto:?subject="+subject+"&body="+body+" "+url;
        }
        function popitup(url, share_site_size) {
            var dimensions = 'height=640,width=555';
            if(share_site_size === 'small'){
                dimensions = 'height=280,width=550';
            }
            var newwindow=window.open(url,'name', dimensions);
            if (window.focus) {newwindow.focus()}
            return false;
        }
        function remove_http(url) {
            disallowed = ['http://', 'https://', 'http://www.', 'https://www.'];
            for(var i=0; i < disallowed.length; i++){
                if(url.includes(disallowed[i])){
                    url.replace(disallowed[i], '');
                }
            }
            return url;
        }
        function triggerShare(url, size){
            if (size === undefined) { size = 'medium';}
            if ( settings.targetBlank == false) {
                popitup(url, size);
            }else{
                window.open(url,'_blank');
            }
        }
        return this.each( function() {
            $(this).on('click', function(e){
                //if link is clicked prevent redirect
                if($(e.target).closest('a').length){
                    e.preventDefault();
                }

                //setting default share link url
                var share_url = $(this).attr('data-url');
                if(typeof share_url == "undefined"){
                    share_url = window.location.href;
                }


                //share based on social media channel
                var return_share_url = '';
                if($(this).attr('data-sshare') == 'twitter'){ //twitter
                    var twitter_message = $(this).attr('data-twitter-message');
                    if(typeof twitter_message == "undefined"){
                        twitter_message = 'Everyone definitely has to see this!';
                    }

                    return_share_url = getTwitterShareUrl(share_url, twitter_message);

                }else if($(this).attr('data-sshare') == 'facebook'){ //facebook
                    var return_share_url = getFacebookShareUrl(share_url);
                }else if($(this).attr('data-sshare') == 'google+'){ //google plus
                    var return_share_url = getGooglePlusShareUrl(share_url);
                }else if($(this).attr('data-sshare') == 'linkedin'){ //linkedin
                    var linkedin_title = $(this).attr('data-linkedin-title');
                    if(typeof linkedin_title == "undefined"){throw "Linkedin title attribute on element undefined (data-linkedin-title)";}
                    var linkedin_summary = $(this).attr('data-linkedin-summary');
                    if(typeof linkedin_summary == "undefined"){ throw "Linkedin summary attribute on element undefined (data-linkedin-summary)";}
                    var linkedin_source = $(this).attr('data-linkedin-source');
                    if(typeof linkedin_source == "undefined"){
                        linkedin_source = remove_http(settings.siteDomain);
                    }
                    return_share_url = getLinkedinShareUrl(share_url, linkedin_title, linkedin_summary, linkedin_source);
                }else if($(this).attr('data-sshare') == 'email'){ //email
                    var email_body = $(this).attr('data-email-body');
                    if(typeof email_body == "undefined"){
                        email_body = 'Everyone definitely has to see this!';
                    }
                    var email_subject = $(this).attr('data-email-subject');
                    if(typeof email_subject == "undefined"){
                        email_subject = 'Checkout '+remove_http(settings.siteDomain)+'!';
                    }
                    return_share_url = getEmailShareLink(share_url, email_subject, email_body);
                }else{
                    throw "Element missing share attribute (data-sshare)";
                }

                if($(this).attr('data-sshare') !== 'email'){
                    triggerShare(return_share_url);
                    if($(this).attr('data-sshare') === 'twitter'){
                        triggerShare(return_share_url, 'small');
                    }
                }


            });
        });

    }
}(jQuery));