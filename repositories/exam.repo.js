const insertExam = async (classId, examName, description, totalQuestion, totalMinutes, publish) => {
    const commandSql = 
        `insert into exam 
            (class_id, exam_name, description, total_question, total_minutes, is_published, created_time, updated_time, is_deleted)
        values 
            ($1::integer, $2::text, $3::text, $4::integer, $5::integer, $6::integer, now(), now(), 0)
        returning exam_id;`
    const response = await _postgresDB.query(commandSql, [classId, examName, description, totalQuestion, totalMinutes, publish])
    return response
}

const insertQuestions = async (examId, questions) => {
    let commandSql = 
        `insert into questions 
            (exam_id, question_number, question_type, question_content, created_time, updated_time, is_deleted)
        values `

    let index = 0
    let params = []
    for (let i = 0; i < questions.length; i++) {
        commandSql += ` ($${++index}::integer, $${++index}::integer, $${++index}::text, $${++index}::text, now(), now(), 0)`
        if (i < questions.length - 1) {
            commandSql += ','
        }

        params.push(examId, Number(questions[i].questionNumber), questions[i].questionType || '', questions[i].questionContent || '')
    }

    commandSql += ' returning question_id;'
    const response = await _postgresDB.query(commandSql, params)
    return response
}

const insertResults = async (results) => {
    let commandSql = 
        `insert into results 
            (question_id, result_key, result_value, is_correct, created_time, updated_time, is_deleted)
        values `
    
    let index = 0
    let params = []
    for (let i = 0; i < results.length; i++) {
        commandSql += ` ($${++index}::integer, $${++index}::integer, $${++index}::text, $${++index}::integer, now(), now(), 0)`
        if (i < results.length - 1) {
            commandSql += ','
        }

        params.push(results[i].questionId, results[i].resultKey, results[i].resultValue, results[i].isCorrect)
    }

    commandSql += ' returning result_id;'
    const response = await _postgresDB.query(commandSql, params)
    return response
}

const deleteExam = async (examId) => {
    const commandSql = `update exam set is_deleted = 1 where exam_id = $1::integer;`
    const response = await _postgresDB.query(commandSql, [examId])
    return response
}

const deleteQuestions = async (examId) => {
    const commandSql = `delete from questions where exam_id = $1::integer;`
    const response = await _postgresDB.query(commandSql, [examId])
    return response
}

const deleteResults = async (examId) => {
    const commandSql = 
        `delete from results where question_id in (select question_id from questions where exam_id = $1::integer);`
    const response = await _postgresDB.query(commandSql, [examId])
    return response
}

const updateExam = async (examId, examName, description, totalQuestion, totalMinutes, publish) => {
    const commandSql = 
        `update exam 
        set 
            exam_name = $1::text, description = $2::text, total_question = $3::integer, 
            total_minutes = $4::integer, is_published = $5::integer, updated_time = now()
        where exam_id = $6::integer;`
    
    const response = await _postgresDB.query(commandSql, [examName, description, totalQuestion, totalMinutes, publish, examId])
    return response
}

const getExamById = async (examId) => {
    const querySql = `select * from exam where exam_id = $1::integer and is_deleted = 0;`
    const response = await _postgresDB.query(querySql, [examId])
    return response.rows[0]
}

const getQuestionsByExamId = async (examId) => {
    const querySql = 
        `select * from questions where exam_id = $1::integer and is_deleted = 0
        order by question_number`
    const response = await _postgresDB.query(querySql, [examId])
    return response.rows
}

const getResultsByExamId = async (examId) => {
    const querySql = 
        `select * from results r
        where 
            r.question_id in (
                select q.question_id from questions q where q.exam_id = $1::integer and q.is_deleted = 0
            ) and r.is_deleted = 0
        order by r.question_id, r.result_key asc;`
    const response = await _postgresDB.query(querySql, [examId])
    return response.rows
}

const insertUserExam = async (userId, classId, examId, startTime, endTime, score) => {
    const commandSql = 
        `insert into user_exam (user_id, class_id, exam_id, start_time, end_time, score, created_time, updated_time, is_deleted)
        values ($1::integer, $2::integer, $3::integer, $4, $5, $6::numeric, now(), now(), 0)
        returning id;`
    const response = await _postgresDB.query(commandSql, [userId, classId, examId, startTime, endTime, score])
    return response
}

const insertUserExamQuestion = async (userExamId, userResults) => {
    let commandSql = 
        `insert into user_exam_question (user_exam_id, question_id, choosed_result_key, choosed_result_value)
        values `

    let index = 0
    let params = []
    for (let i = 0; i < userResults.length; i++) {
        commandSql += ` ($${++index}::integer, $${++index}::integer, $${++index}::integer, $${++index}::text)`
        if (i < userResults.length - 1) {
            commandSql += ','
        }

        params.push(userExamId, userResults[i].questionId, userResults[i].choosedResultKey, userResults[i].choosedResultValue)
    }

    const response = await _postgresDB.query(commandSql, params)
    return response
}

const getUserExam = async (userId, classId, examId) => {
    const querySql = 
        `select * from user_exam ue
        where ue.user_id = $1::integer and ue.class_id = $2::integer and ue.exam_id = $3::integer and ue.is_deleted = 0;`
    const response = await _postgresDB.query(querySql, [userId, classId, examId])
    return response.rows[0]
}

const getUserExamQuestion = async (userExamId) => {
    const querySql = 
        `select * from user_exam_question ueq 
        where ueq.user_exam_id = $1::integer;`
    const response = await _postgresDB.query(querySql, [userExamId])
    return response.rows
}

module.exports = {
    insertExam,
    insertQuestions,
    insertResults,
    deleteExam,
    deleteQuestions,
    deleteResults,
    updateExam,
    getExamById,
    getQuestionsByExamId,
    getResultsByExamId,
    insertUserExam,
    insertUserExamQuestion,
    getUserExam,
    getUserExamQuestion
}