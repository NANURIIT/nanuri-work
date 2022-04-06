/** index **/
'use strict';

/** onload **/
$(function () {

    // 학력 리스트 호출
    getSchoolCareerList();

    // 자격증 리스트 호출
    getCertificateList();

    // 회사소속이력 리스트 호출
    getWorkhistoryList();

    // 교육이수 리스트 호출
    getEducationList();

    // 프로젝트 이력 리스트 호출
    getCareerhistoryList();

    // 대내외 수상경력 리스트 호출
    getAwardList();

    // 외국어 능력 리스트 호출
    getLanguageList();

    // 학력 삭제
    $(document).on('click', '.deleteSchoolCareer', function () {
        confirmDelete($(this).attr('id'), deleteSchoolCareer);
    });

    // 자격증 삭제
    $(document).on('click', '.deleteCertificate', function () {
        confirmDelete($(this).attr('id'), deleteCertificate);
    });

    // 회사소속이력 삭제
    $(document).on('click', '.deleteWorkhistory', function () {
        confirmDelete($(this).attr('id'), deleteWorkhistory);
    });

    // 교육이수 삭제
    $(document).on('click', '.deleteEducation', function () {
        confirmDelete($(this).attr('id'), deleteEducation);
    });

    // 대내외 수상경력 삭제
    $(document).on('click', '.deleteAward', function () {
        confirmDelete($(this).attr('id'), deleteAward);
    });

    $(document).on('click', '.deleteLanguage', function(){
        confirmDelete($(this).attr('id'), deleteLanguage);
    });

    // 프로젝트이력 삭제
    $(document).on('click', '.deleteCareerhistory', function () {
        confirmDelete($(this).attr('id'), deleteCareerhistory);
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
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                CERTIFICATE_HTML += '<div class="list_info">';
                CERTIFICATE_HTML += '   <div class="list_info_title">' + tmpRow.qlfcNm + '</div>';
                CERTIFICATE_HTML += '   <div class="list_info_desc">' + addDot(tmpRow.acqDt) + '</div>';
                CERTIFICATE_HTML += '   <div class="list_info_desc">' + tmpRow.pbcplNm + '</div>';
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
var deleteCertificate = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/certificateDelete',
        data: params,
        success: deleteCB(getCertificateList)
    })
}

/**
 * 프로젝트이력 리스트 호출
 */
var getCareerhistoryList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/careerhistoryist',
        success: function (object) {
            let CAREER_HISTORY_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                CAREER_HISTORY_HTML += '<div class="list_info">';
                CAREER_HISTORY_HTML += '    <div class="list_info_title">' + tmpRow.blgCoNm + '</div>';
                CAREER_HISTORY_HTML += '    <div class="list_info_desc">' + addDot(tmpRow.bzStYm) + ' ~ ' + addDot(tmpRow.bzEdYm) + '</div>';
                CAREER_HISTORY_HTML += '    <div class="list_info_desc">' + tmpRow.dtlCnm + ', ' + tmpRow.chrgBsnNm + '</div>';
                CAREER_HISTORY_HTML += '    <div class="list_info_set">';
                CAREER_HISTORY_HTML += '        <button onclick="location.href=\'/employee/careerhistoryWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                CAREER_HISTORY_HTML += '        <button class="deleteCareerhistory" id="' + tmpRow.seqNo + '">삭제</button>';
                CAREER_HISTORY_HTML += '    </div>';
                CAREER_HISTORY_HTML += '</div>';
            }

            $('#careerhistoryList').html(CAREER_HISTORY_HTML);
        }
    })
}

/**
 * 프로젝트 이력 삭제 함수
 * @param {number} params.seqNo 일련번호 
 */
var deleteCareerhistory = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/careerhistoryDelete',
        data: params,
        success: deleteCB(getCareerhistoryList)
    })
}

/**
 * 회사소속이력 리스트 호출
 */
var getWorkhistoryList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/workhistoryList',
        success: function (object) {
            let WORK_HISTORY_HTML = '';

            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                let period = getPeriod(addDot(tmpRow.encoYm), addDot(tmpRow.rtrmYm));

                WORK_HISTORY_HTML += '<div class="list_info">';
                WORK_HISTORY_HTML += '  <div class="list_info_title">' + tmpRow.wrkplNm + '</div>';
                WORK_HISTORY_HTML += '  <div class="list_info_desc">' + addDot(tmpRow.encoYm) + ' ~ ' + addDot(tmpRow.rtrmYm) + '</div>';
                if (period.month <= 0) {
                    WORK_HISTORY_HTML += '  <div class="list_info_desc">경력 ' + period.year + '년, ' + tmpRow.dtyNm + '</div>';
                } else {
                    WORK_HISTORY_HTML += '  <div class="list_info_desc">경력 ' + period.year + '년' + period.month + '개월, ' + tmpRow.dtyNm + '</div>';
                }
                WORK_HISTORY_HTML += '  <div class="list_info_set">';
                WORK_HISTORY_HTML += '      <button onclick="location.href=\'/employee/workhistoryWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                WORK_HISTORY_HTML += '      <button class="deleteWorkhistory" id="' + tmpRow.seqNo + '">삭제</button>';
                WORK_HISTORY_HTML += '  </div>';
                WORK_HISTORY_HTML += '</div>';
            }

            $('#workhistoryList').html(WORK_HISTORY_HTML);
        }
    })
}

/**
 * 회사소속이력 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
var deleteWorkhistory = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/workhistoryDelete',
        data: params,
        success: deleteCB(getWorkhistoryList)
    })
}

/**
 * 교육이수 리스트 호출
 */
var getEducationList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/educationList',
        success: function (object) {
            let EDUCATION_HTML = '';

            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];

                EDUCATION_HTML += '<div class="list_info">';
                EDUCATION_HTML += ' <div class="list_info_title">' + tmpRow.eduNm + '</div>';
                EDUCATION_HTML += ' <div class="list_info_desc">' + addDot(tmpRow.stDt.substring(0, 6)) + ' ~ ' + addDot(tmpRow.edDt.substring(0, 6)) + '</div>';
                EDUCATION_HTML += ' <div class="list_info_desc">' + tmpRow.orgNm + '</div>';
                EDUCATION_HTML += ' <div class="list_info_set">';
                EDUCATION_HTML += '     <button onclick="location.href=\'/employee/educationWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                EDUCATION_HTML += '     <button class="deleteEducation" id="' + tmpRow.seqNo + '">삭제</button>';
                EDUCATION_HTML += ' </div>';
                EDUCATION_HTML += '</div>';
            }

            $('#educationList').html(EDUCATION_HTML);
        }
    });
}

/**
 * 교육이수 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
var deleteEducation = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/educationDelete',
        data: params,
        success: deleteCB(getEducationList)
    });
}

/**
 * 대내외 수상경력 리스트 호출 함수
 */
var getAwardList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/awardList',
        success: function (object) {
            let AWARD_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];

                AWARD_HTML += '<div class="list_info">';
                AWARD_HTML += ' <div class="list_info_title">' + tmpRow.przNm + '</div>';
                AWARD_HTML += ' <div class="list_info_desc">' + addDot(tmpRow.przDt.substring(0, 6)) + '</div>';
                AWARD_HTML += ' <div class="list_info_desc">' + tmpRow.etcNm + '</div>';
                AWARD_HTML += ' <div class="list_info_set">';
                AWARD_HTML += '     <button onclick="location.href=\'/employee/awardWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                AWARD_HTML += '     <button class="deleteAward" id="' + tmpRow.seqNo + '">삭제</button>';
                AWARD_HTML += ' </div>';
                AWARD_HTML += '</div>';
            }

            $('#awardList').html(AWARD_HTML);
        }
    });
}

/**
 * 대내외 수상경력 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
var deleteAward = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/awardDelete',
        data: params,
        success: deleteCB(getAwardList)
    });
}

/**
 *  외국어 능력 리스트 호출 함수
 */
var getLanguageList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/languageList',
        success: function (object) {
            let LANGUAGE_HTML = '';

            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];

                LANGUAGE_HTML += '<div class="list_info">';
                LANGUAGE_HTML += '  <div class="list_info_title">'+tmpRow.frgnNm+'</div>';
                LANGUAGE_HTML += '  <div class="list_info_desc">'+tmpRow.prfcnNm+'</div>';
                LANGUAGE_HTML += '  <div class="list_info_desc">'+tmpRow.etcNm+'</div>';
                LANGUAGE_HTML += '  <div class="list_info_set">';
                LANGUAGE_HTML += '      <button onclick="location.href=\'/employee/languageWrite?seqNo=' + tmpRow.seqNo + '\'">수정</button>';
                LANGUAGE_HTML += '      <button class="deleteLanguage" id="' + tmpRow.seqNo + '">삭제</button>';
                LANGUAGE_HTML += '  </div>';
                LANGUAGE_HTML += '</div>';
            }
            
            $('#languageList').html(LANGUAGE_HTML);
        }
    });
}

/**
 * 외국어 능력 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
var deleteLanguage = function(params){
    ajaxCall({
        method: 'DELETE',
        url: '/employee/languageDelete',
        data: params,
        success: deleteCB(getLanguageList)
    });
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
var deleteCB = function (callback) {
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
    if (date.length == 6) {
        return date.substring(0, 4) + '.' + date.substring(4, date.length);
    } else if (date.length == 8) {
        return date.substring(0, 4) + '.' + date.substring(4, 6) + '.' + date.substring(6, date.length);
    }
}

var getPeriod = function (d1, d2) {
    let date1 = d1.split('.');
    let date2 = d2.split('.');
    let year = (date2[0] - date1[0]);
    let month = (date2[1] - date1[1]);
    if (month < 0) {
        month += 12;
        year--;
    }
    return { year: year, month: month };
}