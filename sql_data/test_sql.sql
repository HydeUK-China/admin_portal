SELECT * FROM (
	SELECT *, ROW_NUMBER() OVER (PARTITION BY project_matching.project_id ORDER BY project_matching.matching_id) AS rn
    FROM project_matching 
) AS temp
JOIN project_info
ON project_info.project_id = temp.project_id 
WHERE rn=1;


SELECT * FROM project_matching
JOIN expert_info
ON expert_info.expert_id = project_matching.expert_id
WHERE project_matching.project_id=39;


SELECT * FROM project_matching;



UPDATE project_info  SET start_date='2020/08/30' WHERE project_id=39;


-- 12, 17, 10, 11, 26, 16, 56, 23, 14, 15, 116, 114
SELECT * FROM expert_info;
SELECT * FROM expert_info WHERE expert_id IN (20);
DELETE FROM expert_info WHERE expert_id=170;



SELECT * FROM project_info;
DELETE FROM project_info WHERE project_id IN (41, 42, 43);


INSERT INTO expert_info (first_name, last_name, email, phone_no) VALUES ('TEST', 'TEST', 'hh@gmail.com', '123' );
SELECT expert_id FROM expert_info WHERE first_name='TEST' AND last_name='TEST' AND email='hh@gmail.com' AND phone_no='123';

INSERT INTO project_matching (project_id, expert_id) VALUES ('100', '200' );

UPDATE project_info SET start_date='2020-07-13' WHERE project_id=40;

DELETE FROM project_matching WHERE matching_id IN (75, 76, 77, 78, 79, 80);