/** index **/
'use strict';

/** onload **/
$(function () {
    let uri = new URL(document.location.href).pathname;

    // 기본정보 호출
    getBasicInfoDetail();

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

    // 사용가능기술(언어) 리스트 호출
    getSkillList();

    // 장비 정보 호출
    getEquipmentList();

    // 학력 수정
    $(document).on('click', '.updateSchoolCareer', function () {
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/schoolCareerWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/schoolCareerWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 자격증 수정
    $(document).on('click', '.updateCertificate', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/certificateWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/certificateWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 회사소속이력 수정
    $(document).on('click', '.updateWorkhistory', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/workhistoryWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/workhistoryWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 교육이수 수정
    $(document).on('click', '.updateEducation', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/educationWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/educationWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 대내외 수상경력 수정
    $(document).on('click', '.updateAward', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/awardWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/awardWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 외국어 능력 수정
    $(document).on('click', '.updateLanguage', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/languageWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/languageWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 사용가능기술(언어) 수정
    $(document).on('click', '.updateSkill', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/skillWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/skillWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 프로젝트이력 수정
    $(document).on('click', '.updateCareerhistory', function(){
        console.log('asdf');
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/careerhistoryWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/careerhistoryWrite?seqNo=' + $(this).attr('id');
        }
    });

    // 장비 정보 수정
    $(document).on('click', '.updateEquipment', function(){
        if (uri.indexOf('admin') > -1) {
            location.href = '/admin/equipmentWrite?seqNo=' + $(this).attr('id');
        } else if (uri.indexOf('mobile') > -1) {
            location.href = '/mobile/equipmentWrite?seqNo=' + $(this).attr('id');
        }
    });

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

    // 외국어 능력 삭제
    $(document).on('click', '.deleteLanguage', function () {
        confirmDelete($(this).attr('id'), deleteLanguage);
    });

    // 사용가능기술(언어) 삭제
    $(document).on('click', '.deleteSkill', function () {
        confirmDelete($(this).attr('id'), deleteSkill);
    });

    // 프로젝트이력 삭제
    $(document).on('click', '.deleteCareerhistory', function () {
        confirmDelete($(this).attr('id'), deleteCareerhistory);
    });

    // 장비 정보 삭제
    $(document).on('click', '.deleteEquipment', function () {
        confirmDelete($(this).attr('id'), deleteEquipment);
    });

});

/**
 * 기본정보 호출
 */
var getBasicInfoDetail = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/basicInfoDetail',
        success: function (object) {
            let BASIC_INFO_HTML = '';

            BASIC_INFO_HTML += '<div class="list_info">';
            BASIC_INFO_HTML += '    <div class="list_info_title">' + object.userNm + '</div>';
            BASIC_INFO_HTML += '    <div class="list_info_desc">' + object.blgNm + ', ' + object.dtyNm + '</div>';
            BASIC_INFO_HTML += '</div>';

            $('#basicInfo').html(BASIC_INFO_HTML);
        }
    });
}

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
                    SCHOOL_CAREER_HTML += '     <button class="updateSchoolCareer" id="' + tmpRow.seqNo + '">수정</button>';
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
                CERTIFICATE_HTML += '       <button class="updateCertificate" id="'+tmpRow.seqNo+'">수정</button>';
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
 * 회사소속이력 리스트 호출
 */
var getWorkhistoryList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/workhistoryList',
        success: function (object) {
            let WORK_HISTORY_HTML = '';
            let TOTAL_PERIOD_HTML = '';
            let totalPeriod = { year: 0, month: 0 };

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
                WORK_HISTORY_HTML += '      <button class="updateWorkhistory" id="'+tmpRow.seqNo+'">수정</button>';
                WORK_HISTORY_HTML += '      <button class="deleteWorkhistory" id="' + tmpRow.seqNo + '">삭제</button>';
                WORK_HISTORY_HTML += '  </div>';
                WORK_HISTORY_HTML += '</div>';

                totalPeriod.year += period.year;
                totalPeriod.month += period.month;
            }

            totalPeriod.year += Math.floor(totalPeriod.month / 12);
            totalPeriod.month = totalPeriod.month % 12;

            if (totalPeriod.month + totalPeriod.year > 0) {
                if (totalPeriod.month > 0) {
                    TOTAL_PERIOD_HTML += '<span class="title_total">총 경력 ' + totalPeriod.year + '년 ' + totalPeriod.month + '개월</span>'
                } else {
                    TOTAL_PERIOD_HTML += '<span class="title_total">총 경력 ' + totalPeriod.year + '년</span>'
                }
                $('#totalPeriod').html(TOTAL_PERIOD_HTML);
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
                EDUCATION_HTML += '     <button class="updateEducation" id="'+tmpRow.seqNo+'">수정</button>';
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
                AWARD_HTML += '     <button class="updateAward" id="'+tmpRow.seqNo+'">수정</button>';
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
                LANGUAGE_HTML += '  <div class="list_info_title">' + tmpRow.frgnNm + '</div>';
                LANGUAGE_HTML += '  <div class="list_info_desc">' + tmpRow.prfcnNm + '</div>';
                LANGUAGE_HTML += '  <div class="list_info_desc">' + tmpRow.etcNm + '</div>';
                LANGUAGE_HTML += '  <div class="list_info_set">';
                LANGUAGE_HTML += '      <button class="updateLanguage" id="'+tmpRow.seqNo+'">수정</button>';
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
var deleteLanguage = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/languageDelete',
        data: params,
        success: deleteCB(getLanguageList)
    });
}

/**
 *  사용가능기술(언어) 리스트 호출 함수
 */
var getSkillList = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/skillList',
        success: function (object) {
            let SKILL_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];

                SKILL_HTML += '<div class="list_info">';
                SKILL_HTML += ' <div class="list_info_title">' + tmpRow.langFeldNm + '</div>';
                SKILL_HTML += ' <div class="list_info_desc">' + tmpRow.prfcnNm + '</div>';
                SKILL_HTML += ' <div class="list_info_desc">' + tmpRow.etcNm + '</div>';
                SKILL_HTML += ' <div class="list_info_set">';
                SKILL_HTML += '     <button class="updateSkill" id="'+tmpRow.seqNo+'">수정</button>';
                SKILL_HTML += '     <button class="deleteSkill" id="' + tmpRow.seqNo + '">삭제</button>';
                SKILL_HTML += ' </div>';
                SKILL_HTML += '</div>';
            }
            $('#skillList').html(SKILL_HTML);
        }
    })
}

/**
 * 사용가능기술(언어) 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
var deleteSkill = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/employee/skillDelete',
        data: params,
        success: deleteCB(getSkillList)
    });
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
                CAREER_HISTORY_HTML += '        <button class="updateCareerhistory" id="'+tmpRow.seqNo+'">수정</button>';
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
 * 장비 정보 리스트 함수
 */
 var getEquipmentList = function() {
    ajaxCall({
        method: 'GET',
        url: '/equipment/equipmentList',
        success: function (object) {
            let EQUIPMENT_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];

                EQUIPMENT_HTML += '<div class="list_info">';
                EQUIPMENT_HTML += '     <div class="list_info_title">' + tmpRow.eqType + '</div>';
                EQUIPMENT_HTML += '     <div class="list_info_desc">' + tmpRow.srlNo + ', ' + tmpRow.pyDt + '</div>';
                EQUIPMENT_HTML += '     <div class="list_info_set">';
                EQUIPMENT_HTML += '         <button class="updateEquipment" id="'+tmpRow.seqNo+'">수정</button>';
                EQUIPMENT_HTML += '         <button class="deleteEquipment" id="' + tmpRow.seqNo + '">삭제</button>';
                EQUIPMENT_HTML += '     </div>';
                EQUIPMENT_HTML += '</div>';
            }
            $('#equipmentList').html(EQUIPMENT_HTML);
        }
    })
 }

 /**
 * 장비 정보 삭제 함수
 * @param {number} params.seqNo 일련번호
 */
  var deleteEquipment = function (params) {
    ajaxCall({
        method: 'DELETE',
        url: '/equipment/equipmentDelete',
        data: params,
        success: deleteCB(getEquipmentList)
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

/**
 * 기간 출력 함수
 * @param {string} d1 날짜1
 * @param {string} d2 날짜2
 * @returns 기간
 */
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