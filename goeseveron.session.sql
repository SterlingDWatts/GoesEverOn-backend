Select s.show_name,
    s.show_description,
    s.show_year,
    array_agg(g.genre_name) as genres
FROM shows as s
    LEFT JOIN shows_genres as sg ON s.show_id = sg.show_id
    LEFT JOIN genres as g ON sg.genre_id = g.genre_id
GROUP BY s.show_name,
    s.show_description,
    s.show_year;