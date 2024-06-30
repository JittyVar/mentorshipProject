import os
import pandas as pd # type: ignore
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense
from sklearn.model_selection import train_test_split
from keras.layers import Input
from keras.layers import Concatenate
from keras.models import Model
import matplotlib.pyplot as plt
from tensorflow.keras.callbacks import History
from tensorflow.keras import layers
import keras





# Load the trained model




model = keras.models.load_model("mentor_recommendation_model_with_personalities.h5")