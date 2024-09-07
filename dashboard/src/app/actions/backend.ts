// Save new topic (POST request)
export const saveTopics = async (topic: { name: string; description: string }) => {
  try {
    const response = await fetch("http://localhost:3002/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving topic:", error);
    throw error;
  }
};

// Save new question (POST request)
export const saveQuestion = async (question: { title: string; topicId: number; isSolved: boolean }) => {
  try {
    const response = await fetch("http://localhost:3002/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving question:", error);
    throw error;
  }
};

// Fetch all questions by Topic ID (GET request)
export const getQuestionsByTopicId = async (topicId: number) => {
  try {
    const response = await fetch(`http://localhost:3002/api/topics/${topicId}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching questions for topic ${topicId}:`, error);
    throw error;
  }
};

export const deleteQuestion = async (questionId: number, topicId: number) => {
  try {
    const response = await fetch(`http://localhost:3002/api/topics/${topicId}/questions/${questionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Question not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error deleting question ${questionId}:`, error);
    throw error;
  }
};