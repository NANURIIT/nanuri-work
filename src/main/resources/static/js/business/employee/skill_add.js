/** skill_add **/
'use strict';

/** onload **/
$(function () {

    // 저장버튼 클릭
    $(document).on('click', '#save', function () {
        let params = {
            langFeldNm : $('#langFeldNm').val(), 
            prfcnNm : $('#prfcnNm').val(), 
            etcNm : $('#etcNm').val()
        };
        registerSkill(params);
    });
});

var registerSkill = function (params) {
    if (isEmpty(params.langFeldNm)) {
        openPopup({
            title: '실패',
            text: '사용가능기술(언어)를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#langFeldNm').focus();
                });
            }
        });
    } else if (isEmpty(params.prfcnNm)) {
        openPopup({
            title: '실패',
            text: '숙련도를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#prfcnNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method: 'POST',
            url: '/employee/skillWrite',
            data: params,
            success: openPopup({
                title: '성공',
                text: '사용가능기술(언어) 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}