var wordpress_feed = "https://itssadesmith.wordpress.com/feed/";
var api_key = "&api_key=m939dea7ujbhckcf2hycuxbelrppamgxfp8qm76a";
// var wordpress_feed_tags = "https://itssadesmith.wordpress.com/tag/css/feed";
// var wordpress_feed_category = "https://itssadesmith.wordpress.com/category/uncategorized/feed";
// var wordpress_feed_post = "https://itssadesmith.wordpress.com/Web Development/feed/";
function slugify(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function generate_post_template(title, category, date, description, slug) {
    var article_div = $('<article>', {class:"col-sm-6 col-md-6 post wow fadeInUp"});
    article_div.attr("data-wow-delay", ".2s");
    var h3_tag = $('<h3>');
    h3_tag.text(title);
    var meta_tag = $('<div>', {class: "meta"});
    var span_category = $('<span>', {class:"meta-category", "tabindex": 0, "aria-label": category+" Category"}).text(category);
    var span_date = $('<span>').text(date);
    meta_tag.append(span_category);
    meta_tag.append(span_date);
    var p_tag = $('<p>').text(description);
    var a_tag = $('<a>', {class:"btn-action"});
    a_tag.text("Read More");
    a_tag.attr('href', "blog/"+slug+".html");
    article_div.append(h3_tag);
    article_div.append(meta_tag);
    article_div.append(p_tag);
    article_div.append(a_tag);
    return article_div;
}

function get_readable_date(unformatted_date){
	var alpha_month = [ "January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December" ];
	var post_date = new Date(unformatted_date);
	var year = post_date.getFullYear();
	var month = alpha_month[post_date.getMonth()];
	var date = post_date.getDate();
	var date_string = month+" "+date+", "+year;
	return date_string;
}

function get_article_template_from_rss(item, element){
    var cur_slug = slugify(item['title']);
    var cur_title = item['title'];
    // var cur_link= item['link'];
    var cur_cat = item['categories'][0];
    var cur_description = item['description'];
    // var cur_content = item['content'];
    // var cur_id = item['guid'].split('=').pop();
    var cur_date = get_readable_date(item['pubDate'].split(' ')[0]);
    var cur_article = generate_post_template(cur_title, cur_cat, cur_date, cur_description, cur_slug);
    return cur_article;
}
//
// if($("#blog__container__home").length){
//     $("#blog__container__home").hide();
//     $.get("https://api.rss2json.com/v1/api.json?rss_url="+wordpress_feed+api_key, function( data ) {
//         if(data['status'] === 'ok'){
//             var blog_posts = data['items'];
//             for(var i =0; i < 2 ; i++){
//                 $("#blog__container__home").append(get_article_template_from_rss(blog_posts[i]));
//             }
//
//         }
//
//     });
//     $("#blog__container__home").fadeIn();
// }
//
// if($("#blog__container__blog").length){
//     $("#blog__container__blog").hide();
//     $.get("https://api.rss2json.com/v1/api.json?rss_url="+wordpress_feed+api_key, function( data ) {
//         if(data['status'] === 'ok'){
//             var blog_posts = data['items'];
//             for(var i =0; i < blog_posts.length ; i++){
//                 $("#blog__container__blog").append(get_article_template_from_rss(blog_posts[i]));
//             }
//
//         }
//
//     });
//     $("#blog__container__blog").fadeIn();
// }
//
//
// if($("#blog__container__tagged").length){
//     var tag_name = getQueryVariable('tag');
//     $("#blog__container__tagged").hide();
//     if(tag_name != null){
//         $(".tag-name").text(decodeURIComponent(tag_name).replace('-', ' '));
//         var wordpress_feed_tags = "https://itssadesmith.wordpress.com/tag/"+tag_name+"/feed"+api_key;
//             $.get("https://api.rss2json.com/v1/api.json?rss_url="+wordpress_feed_tags, function( data ) {
//                 if(data['status'] === 'ok'){
//                     var blog_posts = data['items'];
//                     for(var i =0; i < blog_posts.length ; i++){
//                         $("#blog__container__tagged").append(get_article_template_from_rss(blog_posts[i]));
//                     }
//
//                 }
//
//             });
//     }
//     $("#blog__container__tagged").fadeIn();
// }
//
// if($("#blog__container__category").length){
//     $("#blog__container__category").hide();
//     var cat_name = getQueryVariable('category');
//     if(cat_name != null){
//         $(".category-name").text(decodeURIComponent(cat_name).replace('-', ' '));
//         var wordpress_feed_category = "https://itssadesmith.wordpress.com/category/"+cat_name+"/feed"+api_key;
//             $.get("https://api.rss2json.com/v1/api.json?rss_url="+wordpress_feed_category, function( data ) {
//                 if(data['status'] === 'ok'){
//                     var blog_posts = data['items'];
//                     for(var i =0; i < blog_posts.length ; i++){
//                         $("#blog__container__category").append(get_article_template_from_rss(blog_posts[i]));
//                     }
//
//                 }
//
//             });
//     }
//     $("#blog__container__category").fadeIn();
//
// }
