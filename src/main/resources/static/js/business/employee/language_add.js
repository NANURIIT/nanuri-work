/** language_add **/
'use strict';

/** onload **/
$(function(){

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let uri = new URL(document.location.href).pathname;
    let pathname = uri.split('/')[1];
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
            registerLanguage(params, pathname);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerLanguage(params, pathname);
        }
    });

    // 취소 버튼 클릭
    $(document).on('click', '.cancel_button', function () {
        if (uri.includes('admin') > -1) {
            location.href = '/admin/index';
        } else if (uri.includes('mobile') > -1) {
            location.href = '/mobile/index';
        }
    });
});

/**
 * 외국어능력 등록
 * @param {string} params.frgnNm 외국어
 * @param {string} params.prfcnNm 숙련도
 * @param {string} params.etcNm 기타
 * @param {string} params.seqNo 일련번호
 * @param {string} pathname pc, mobile구분자 -> admin or mobile
 */
var registerLanguage = function(params, pathname){
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
                    location.href = '/'+pathname+'/index';
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