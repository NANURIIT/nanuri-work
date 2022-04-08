/** language_add **/
'use strict';

/** onload **/
$(function(){

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    if (mode == 'M') {
        getLanguageDetail(seqNo);
    }
    
    // 저장버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            frgnNm : $('#frgnNm').val(), 
            prfcnNm : $('#prfcnNm').val(), 
            etcNm : $('#etcNm').val()
        };

        if (mode == 'W') {
            registerLanguage(params);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerLanguage(params);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function(){
        location.href = '/mobile/employeeInfo';
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

/**
 * 외국어능력 상세 조회
 * @param {number} seqNo 일련번호
 */
var getLanguageDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/languageDetail/'+seqNo, 
        success : function(object){
            $('#frgnNm').val(object.frgnNm);
            $('#prfcnNm').val(object.prfcnNm);
            $('#etcNm').val(object.etcNm);
        }
    });
}