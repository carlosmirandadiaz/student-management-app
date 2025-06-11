import React, { useEffect, useState } from 'react';

interface Student {
  id: number;
  name: string;
  grade: number;
}

const API_URL = 'http://localhost:8080/students';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = { name, grade: Number(grade) };

    if (editingId !== null) {
      await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...studentData }),
      });

      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, name: studentData.name, grade: studentData.grade } : s
        )
      );

      setEditingId(null);
    } else {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      const saved = await res.json();
      setStudents((prev) => [...prev, saved]);
    }

    setName('');
    setGrade('');
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName('');
      setGrade('');
    }
  };

  return (
    <div className="student-list">
      <h2>Students</h2>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>{student.name} - Grade {student.grade}</span>
            <span>
              <button onClick={() => {
                setEditingId(student.id);
                setName(student.name);
                setGrade(student.grade.toString());
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(student.id)}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="student-form">
        <h3>{editingId ? 'Edit Student' : 'Add New Student'}</h3>
        {editingId && <p>Editing ID: {editingId}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Grade"
            required
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  );
};

export default StudentList;
