/** index **/
'use strict';

/** onload **/
$(function () {

    // 학력 리스트 호출
    getSchoolCareerList();

    // 자격증 리스트 호출
    getCertificateList();

    // 학력 삭제
    $(document).on('click', '.deleteSchoolCareer', function () {
        confirmDelete($(this).attr('id'), deleteSchoolCareer);
    });

    //자격증 삭제
    $(document).on('click', '.deleteCertificate', function(){
        confirmDelete($(this).attr('id'), deleteCertificate);
    });
});

/**
 * 학력 리스트 호출
 */
var getSchoolCareerList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/schoolCareerList',
        success: function (object) {
            let SCHOOL_CAREER_HTML = '';
            if (object.length > 0) {
                for (let i = 0; i < object.length; i++) {
                    let tmpRow = object[i];
                    SCHOOL_CAREER_HTML += '<div class="list_info">';
                    SCHOOL_CAREER_HTML += ' <div class="list_info_title">' + tmpRow.schlNm + '</div>';
                    SCHOOL_CAREER_HTML += ' <div class="list_info_desc">' + addDot(tmpRow.etisYm) + ' ~ ' + addDot(tmpRow.grduYm) + ' 졸업</div>';
                    SCHOOL_CAREER_HTML += ' <div class="list_info_set">';
                    SCHOOL_CAREER_HTML += '     <button onclick="location.href=\'/employee/schoolCareerWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                    SCHOOL_CAREER_HTML += '     <button class="deleteSchoolCareer" id="' + tmpRow.seqNo + '">삭제</button>';
                    SCHOOL_CAREER_HTML += ' </div>';
                    SCHOOL_CAREER_HTML += '</div>';
                }
            }

            $('#schoolCareerList').html(SCHOOL_CAREER_HTML);
        }
    });
}

/**
 * 학력 삭제 함수
 * @param {number} params.seqNo
 */
var deleteSchoolCareer = function (params) {
    ajaxCall({
        method: "DELETE",
        url: '/employee/schoolCareerDelete',
        data: params,
        success: deleteCB(getSchoolCareerList)
    });
}

/**
 * 자격증 리스트 호출
 */
var getCertificateList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/certificateList',
        success: function (object) {
            let CERTIFICATE_HTML = '';
            for(let i = 0; i < object.length; i++){
                let tmpRow = object[i];
                CERTIFICATE_HTML += '<div class="list_info">';
                CERTIFICATE_HTML += '   <div class="list_info_title">'+tmpRow.qlfcNm+'</div>';
                CERTIFICATE_HTML += '   <div class="list_info_desc">취득일자 : '+addDot(tmpRow.acqDt)+'</div>';
                CERTIFICATE_HTML += '   <div class="list_info_set">';
                CERTIFICATE_HTML += '       <button onclick="location.href=\'/employee/certificateWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                CERTIFICATE_HTML += '       <button class="deleteCertificate" id="' + tmpRow.seqNo + '">삭제</button>';
                CERTIFICATE_HTML += '   </div>';
                CERTIFICATE_HTML += '</div>';
            }

            $('#certificateList').html(CERTIFICATE_HTML);
        }
    })
}

/**
 * 자격증 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
var deleteCertificate = function(params){
    ajaxCall({
        method : 'DELETE', 
        url : '/employee/certificateDelete', 
        data : params, 
        success : deleteCB(getCertificateList)
    })
}

/**
 * 삭제 확인팝업 함수
 * @param {number} seqNo 일련번호
 */
 var confirmDelete = function (seqNo, callback) {
    let params = { seqNo: seqNo };

    openPopup({
        title: '삭제',
        text: '삭제하시겠습니까?',
        type: 'warning',
        callback: function () {
            $(document).on('click', '.confirm', function () {
                callback(params);
            });
        }
    });
}

/**
 * 삭제 콜백함수
 * @param {function} callback 확인버튼 클릭 후 처리
 */
var deleteCB = function(callback){
    openPopup({
        title: '성공',
        text: '삭제완료했습니다.',
        type: 'success',
        callback: function () {
            $(document).on('click', '.confirm', function () {
                callback();
            });
        }
    });
}

/**
 * 날짜에 점 찍는 함수
 * @param {날짜} date 
 * @returns 
 */
var addDot = function (date) {
    if(date.length == 6){
        return date.substring(0, 4) + '.' + date.substring(4, date.length);
    } else if(date.length == 8){
        return date.substring(0, 4) + '.' + date.substring(4, 6) + '.' + date.substring(6, date.length);
    }
}