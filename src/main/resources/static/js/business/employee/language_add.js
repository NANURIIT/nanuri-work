/** language_add **/
'use strict';

/** onload **/
$(function(){
    
    // 저장버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            frgnNm : $('#frgnNm').val(), 
            prfcnNm : $('#prfcnNm').val(), 
            etcNm : $('#etcNm').val()
        };

        registerLanguage(params);
    });
});

var registerLanguage = function(params){
    if(isEmpty(params.frgnNm)){
        openPopup({
            title: '실패',
            text: '언어를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#frgnNm').focus();
                });
            }
        });
    } else if(isEmpty(params.prfcnNm)){
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
            url: '/employee/languageWrite',
            data: params,
            success: openPopup({
                title: '성공',
                text: '외국어 능력 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}