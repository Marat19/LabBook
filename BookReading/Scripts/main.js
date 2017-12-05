$('.like-btn').click(function () {
    var reviewId = $(this).data('review');
    var $this = $(this).children('span');
    $.post({
        'url': '/Review/IncrementAndGetLikes',
        'data': { reviewId: reviewId },
        'success': function (Like) {
            $this.text('Лайкнуть: ' + Like);
        },
        'error': function (_, error) {
            alert('error: ' + error)
        }
    });
});

$('.report-btn').click(function () {
    var result = confirm("Вы хотите пожаловаться?");
    var $this = $(this).parent();
    if (result) {
        var reviewId = $(this).data('review');
        var reason = prompt('Введите причину жалобы:');
        if (reason.trim() !== '') {
            $.post({
                'url': '/Review/ReportOffensiveReview',
                'data': { reviewId: reviewId, reason: reason },
                'success': function () {
                    alert("Жалоба принята");
                    $this.css('opacity', '.7');
                },
                'error': function (_, error) {
                    alert('error: ' + error)
                }
            });
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
});
