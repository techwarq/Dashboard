// Save new topic (POST request)


type Question = {
  id: number;
  title: string;
  isSolved: boolean;
  solvedAt?: string | null;
  link?: string;
  youtube?: string;
};
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
export const saveQuestion = async (question: { title: string; isSolved: boolean; link?: string; youtube?: string; topicId: number }) => {
  try {
    const { topicId, ...questionData } = question; // Extract topicId and question details
    const response = await fetch(`http://localhost:3002/api/topics/${topicId}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData), // Send question details in the request body
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
    const response = await fetch(`http://localhost:3002/api/topics/${topicId}/questions/`, {
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
    console.log(`Sending DELETE request for questionId: ${questionId}, topicId: ${topicId}`);
    const response = await fetch(`http://localhost:3002/api/topics/${topicId}/questions/${questionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      if (response.status === 404) {
        throw new Error('Question not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Delete request succeeded');
    return await response.json();
  } catch (error) {
    console.error(`Error deleting question ${questionId}:`, error);
    throw error;
  }
};



export const updateQuestion = async (questionId: number, topicId: number, data: Partial<Question>) => {
  try {
    const response = await fetch(`http://localhost:3002/api/topics/${topicId}/questions/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};