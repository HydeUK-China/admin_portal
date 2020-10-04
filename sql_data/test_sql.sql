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
    
SELECT * FROM expert_info WHERE expert_id IN (12, 17, 10, 11, 26, 16, 56, 23, 14, 15, 116, 114);